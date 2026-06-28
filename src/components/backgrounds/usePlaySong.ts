import { useEffect, useState, useRef } from "react";

function playAfterInteraction(audio: HTMLAudioElement, setPlaying: (p: boolean) => void) {
    const play = () => {
        audio.play().catch(() => { });
        setPlaying(true);
        window.removeEventListener("pointerdown", play);
        window.removeEventListener("keydown", play);
    };

    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });
}

export default function usePlaySong(track: HTMLAudioElement | string | undefined) {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.4);
    const [progress, setProgress] = useState(0)

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!track) return;

        const audio = track instanceof HTMLAudioElement ? track : new Audio(track);
        audioRef.current = audio;

        // Attempt autoplay
        audio.play()
            .then(() => setPlaying(true))
            .catch(() => playAfterInteraction(audio, setPlaying));

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, [track]);

    useEffect(() => {
        if (!audioRef.current) return
        const audio = audioRef.current

        audio.volume = volume;
        audio.loop = true;
        audio.onprogress = () => {
            console.log(`${audio.currentTime} / ${audio.duration}`)
            setProgress(audio.currentTime / audio.duration)
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const play = async () => {
        if (audioRef.current) {
            await audioRef.current.play().catch(() => { });
            setPlaying(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlaying(false);
        }
    };

    return {
        play,
        pause,
        playing,
        volume,
        setVolume,
        progress
    };
}
