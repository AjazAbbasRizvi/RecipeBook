import { IngredientModel } from "../shared/ingredient.model";

export class RecipeModel{
    public name : string;
    public description : string;
    public imagePath : string;
    public ingredient : IngredientModel[];

    constructor(name : string, desc :string, imagePath:string, Ingredients : IngredientModel[])
    {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredient = Ingredients
    }
}