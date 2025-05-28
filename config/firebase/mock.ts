/**
 * This is a mock implementation of Firebase to bypass native module errors
 * Use this file during development when Firebase native modules are not properly installed
 */

// Mock Firebase implementations
const firebaseAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => { 
    return () => {}; // Return unsubscribe function
  },
  signInWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'mock-uid' } }),
  createUserWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'mock-uid' } }),
  signOut: () => Promise.resolve(),
};

// Mock Firestore with functioning methods for testing
const firebaseFirestore = {
  collection: (collectionName) => ({
    doc: (id) => ({
      id: id || 'mock-doc-id',
      get: () => Promise.resolve({
        exists: true,
        id: id || 'mock-doc-id',
        data: () => ({ mockData: true, name: "Mock Data" }),
      }),
      set: (data) => Promise.resolve(data),
      update: (data) => Promise.resolve(data),
      delete: () => Promise.resolve(),
    }),
    add: (data) => Promise.resolve({ 
      id: 'mock-doc-id-' + Math.random().toString(36).substring(2, 9),
      get: () => Promise.resolve({
        exists: true,
        data: () => data
      })
    }),
    get: () => Promise.resolve({
      empty: false,
      docs: [
        {
          id: 'mock-item-1',
          data: () => ({ name: 'Pizza', calories: 285, category: 'Fast Food' }),
        },
        {
          id: 'mock-item-2',
          data: () => ({ name: 'Cheese Pizza', calories: 265, category: 'Fast Food' }),
        },
        {
          id: 'mock-item-3',
          data: () => ({ name: 'Frozen Pizza', calories: 288, category: 'Fast Food' }),
        },
      ]
    }),
    where: () => ({
      get: () => Promise.resolve({
        empty: false,
        docs: [
          {
            id: 'mock-item-1',
            data: () => ({ name: 'Pizza', calories: 285 }),
          },
        ]
      }),
    }),
    orderBy: () => ({
      startAt: () => ({
        endAt: () => ({
          get: () => Promise.resolve({
            empty: false,
            docs: [
              {
                id: 'mock-item-1',
                data: () => ({ name: 'Pizza', calories: 285 }),
              },
            ]
          }),
        }),
      }),
    }),
    limit: () => ({
      get: () => Promise.resolve({
        empty: false,
        docs: [
          {
            id: 'mock-item-1',
            data: () => ({ name: 'Pizza', calories: 285 }),
          },
        ]
      }),
    }),
    batch: () => ({
      set: () => {},
      update: () => {},
      delete: () => {},
      commit: () => Promise.resolve(),
    }),
  }),
  batch: () => ({
    set: () => {},
    update: () => {},
    delete: () => {},
    commit: () => Promise.resolve(),
  }),
};

const firebaseStorage = {
  ref: (path) => ({
    put: () => ({
      on: (event, progressCb, errorCb, completeCb) => {
        setTimeout(() => completeCb(), 500); // Simulate completion after 500ms
        return { cancel: () => {} };
      },
      snapshot: { 
        ref: { 
          getDownloadURL: () => Promise.resolve('https://mockurl.com/image.jpg')
        } 
      }
    }),
    getDownloadURL: () => Promise.resolve('https://mockurl.com/image.jpg'),
    delete: () => Promise.resolve(),
  })
};

const firebaseCrashlytics = {
  recordError: () => {},
  log: () => {},
};

const app = {
  name: '[DEFAULT]',
};

export {
  app,
  firebaseAuth,
  firebaseFirestore,
  firebaseStorage,
  firebaseCrashlytics
};
