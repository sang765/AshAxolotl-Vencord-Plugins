import { findOption, OptionalMessageOption } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";


const settings = definePluginSettings({
    HeadsGif: {
        description: "Heads Gif",
        type: OptionType.STRING,
        default: "https://tenor.com/view/heads-gif-21854724",
        restartNeeded: false,
    },
    TailsGif: {
        description: "Heads Gif",
        type: OptionType.STRING,
        default: "https://tenor.com/view/coins-tails-coin-flip-a-coin-coinflip-gif-21479856",
        restartNeeded: false,
    },
    Separater: {
        description: "the separater in the select-random command",
        type: OptionType.STRING,
        default: ",",
        restartNeeded: false,
    }
});

export default definePlugin({
    name: "Randomize Commands",
    description: "/coin and /select-random",
    authors: [{
        name: "AshAxolotl",
        id: BigInt(461084048337403915n),
    }],
    settings,
    commands: [
        {
            name: "coin",
            description: "coin flip / toss",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: findOption(opts, "message", "") + " "+ selectRandomElement([settings.store.HeadsGif, settings.store.TailsGif])
            }),
        },
        {
            name: "select-random",
            description: "selects a random word from your input",
            options: [OptionalMessageOption],
            execute: opts => ({
                content: "From " + findOption(opts, "message", "") + " randomly selected: " + GetRandomFromString(findOption(opts, "message", "")) 
            }),
        }
    ],
});


function selectRandomElement(arr) {
    // generate a random index based on the length of the array
    const randomIndex = Math.floor(Math.random() * arr.length);

    // return the element at the randomly generated index
    return arr[randomIndex];
}

function GetRandomFromString(message: string): string {
    let string_array = message.split(settings.store.Separater);
    return selectRandomElement(string_array);
}