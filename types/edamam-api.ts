/**
 * Edamam Food Database API Response Models
 */

export interface EdamamApiResponse {
  text: string;
  count: number;
  parsed: any[];
  hints: FoodHint[];
  _links: {
    next?: {
      href: string;
      title: string;
    };
  };
}

export interface FoodHint {
  food: Food;
  measures: Measure[];
}

export interface Food {
  foodId: string;
  label: string;
  knownAs: string;
  nutrients: Nutrients;
  category: string;
  categoryLabel: string;
  image?: string;
  servingSizes?: ServingSize[];
}

export interface Nutrients {
  ENERC_KCAL: number; // Energy (calories)
  PROCNT: number;     // Protein
  FAT: number;        // Fat
  CHOCDF: number;     // Carbohydrates
  FIBTG: number;      // Fiber
}

export interface ServingSize {
  uri: string;
  label: string;
  quantity: number;
}

export interface Measure {
  uri: string;
  label: string;
  weight: number;
  qualified?: QualifiedMeasure[];
}

export interface QualifiedMeasure {
  qualifiers: Qualifier[];
  weight: number;
}

export interface Qualifier {
  uri: string;
  label: string;
}

/**
 * Simplified food item model for internal use
 */
export interface SimplifiedFoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  category: string;
  image?: string;
  measures: {
    label: string;
    weight: number;
    uri: string;
  }[];
}

/**
 * Search parameters for Edamam API
 */
export interface EdamamSearchParams {
  ingr?: string;           // Ingredient query
  app_id: string;          // Application ID
  app_key: string;         // Application Key
  'nutrition-type'?: 'cooking' | 'logging';
  'category'?: string[];   // Food category filter
  'health'?: string[];     // Health labels
  'diet'?: string[];       // Diet labels
  'calories'?: string;     // Calorie range (e.g., "100-300")
  'time'?: string;         // Cooking time range
  'imageSize'?: 'THUMBNAIL' | 'SMALL' | 'REGULAR' | 'LARGE';
  'random'?: boolean;      // Random results
  'field'?: string[];      // Fields to include
  'co2EmissionsClass'?: 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  'tag'?: string[];        // Generic tags
}

/**
 * Utility functions for converting between models
 */
export class EdamamModelConverter {
  /**
   * Convert Edamam Food to SimplifiedFoodItem
   */
  static toSimplifiedFoodItem(foodHint: FoodHint): SimplifiedFoodItem {
    const { food, measures } = foodHint;
    
    return {
      id: food.foodId,
      name: food.label,
      calories: Math.round(food.nutrients.ENERC_KCAL || 0),
      protein: Math.round(food.nutrients.PROCNT || 0),
      carbs: Math.round(food.nutrients.CHOCDF || 0),
      fat: Math.round(food.nutrients.FAT || 0),
      fiber: Math.round(food.nutrients.FIBTG || 0),
      category: food.category,
      image: food.image,
      measures: measures.map(measure => ({
        label: measure.label,
        weight: measure.weight,
        uri: measure.uri
      }))
    };
  }

  /**
   * Calculate calories for a specific serving size
   */
  static calculateCaloriesForServing(
    food: Food,
    measureWeight: number,
    servingWeight: number = 100
  ): number {
    const caloriesPer100g = food.nutrients.ENERC_KCAL;
    const actualWeight = (measureWeight * servingWeight) / 100;
    return Math.round((caloriesPer100g * actualWeight) / 100);
  }

  /**
   * Get the most common serving measures
   */
  static getCommonMeasures(measures: Measure[]): Measure[] {
    const commonMeasureLabels = [
      'Serving', 'Cup', 'Tablespoon', 'Ounce', 'Gram', 
      'Slice', 'Piece', 'Unit', 'Whole'
    ];
    
    return measures.filter(measure => 
      commonMeasureLabels.includes(measure.label)
    ).slice(0, 5); // Return top 5 common measures
  }
}
