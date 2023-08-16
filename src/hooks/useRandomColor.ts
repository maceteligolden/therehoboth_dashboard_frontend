import { colors } from "../constants/colors";
import { getRandomInt } from "../utils/random_number";

export function useRandomColor(){

    const colors_count = colors.length;

    // get a random color within the colors index
    const color_select = getRandomInt(colors_count);

    // returns a different color 
    return colors[color_select];
}