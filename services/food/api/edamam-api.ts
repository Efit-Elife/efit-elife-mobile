import { EdamamApiResponse, EdamamSearchParams } from '@/types/edamam-api';

const EDAMAM_BASE_URL = 'https://api.edamam.com/api/food-database/v2/parser';
const APP_ID = '33e4acf0';
const APP_KEY = '6460dfb3bcd767429c32f1ffda8614dd';

export class EdamamApi {
  /**
   * Search for food items using the Edamam API
   */
  static async searchFood(query: string, options?: Partial<EdamamSearchParams>): Promise<EdamamApiResponse> {
    const params = new URLSearchParams();
    params.append('app_id', APP_ID);
    params.append('app_key', APP_KEY);
    params.append('ingr', query);
    params.append('nutrition-type', 'cooking');
    
    // Add optional parameters
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const url = `${EDAMAM_BASE_URL}?${params.toString()}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: EdamamApiResponse = await response.json();
      
      // Ensure _links object exists to prevent undefined errors
      if (!data._links) {
        data._links = {};
      }
      
      return data;
    } catch (error) {
      console.error('Error searching food:', error);
      throw error;
    }
  }

  /**
   * Get popular food items (random search)
   */
  static async getPopularFoods(): Promise<EdamamApiResponse> {
    return this.searchFood('popular', {
      random: true
    });
  }

  /**
   * Search food by category
   */
  static async searchByCategory(category: string): Promise<EdamamApiResponse> {
    return this.searchFood(category, {
      category: [category]
    });
  }

  /**
   * Get food details with specific nutrition type
   */
  static async getFoodDetails(
    foodId: string, 
    nutritionType: 'cooking' | 'logging' = 'cooking'
  ): Promise<EdamamApiResponse> {
    const params = new URLSearchParams();
    params.append('app_id', APP_ID);
    params.append('app_key', APP_KEY);
    params.append('nutrition-type', nutritionType);
    params.append('food-id', foodId);

    const url = `${EDAMAM_BASE_URL}?${params.toString()}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: EdamamApiResponse = await response.json();
      
      // Ensure _links object exists to prevent undefined errors
      if (!data._links) {
        data._links = {};
      }
      
      return data;
    } catch (error) {
      console.error('Error getting food details:', error);
      throw error;
    }
  }
}
