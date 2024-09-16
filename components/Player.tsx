import {useEffect, useState} from "react";
import {Audio} from "expo-av";
import {setAudioModeAsync} from "expo-av/build/Audio";
import {InterruptionModeIOS} from "expo-av/src/Audio.types";
import {Button} from "react-native";
import {ThemedView} from "@/components/ThemedView";

export function Player(props: {audioURI?: string}) {

    const [sound, setSound] = useState<Audio.Sound>();
    const [playing, setPlaying] = useState(false);
    async function playSound() {
        if (!sound) {
            await loadSound()
        } else {
            await sound!.playAsync();
            setPlaying(true)
        }
    }

    async function loadSound() {
        const {sound} = await Audio.Sound.createAsync({uri: props.audioURI!}, {shouldPlay: true})
        await setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        })
        setSound(sound)
        setPlaying(true)
    }

    async function pauseSound() {
        await sound?.pauseAsync();
        setPlaying(false)
    }
    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    if (!props.audioURI) {
        return <></>
    }

    return <ThemedView>
        <Button title={playing? 'pause' : 'play'} onPress={playing? pauseSound : playSound}></Button>
    </ThemedView>
}