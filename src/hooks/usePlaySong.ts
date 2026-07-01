import { useBackgroundMusic } from "@/stores/music-store";
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
    const shouldPlay = useBackgroundMusic(s => s.sholdPlay)

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.4);
    const [progress, setProgress] = useState(0)

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) return
        const audio = audioRef.current

        if (!shouldPlay) {
            audio.pause()
            setPlaying(false)
        } else {
            audio.play()
                .then(() => setPlaying(true))
                .catch(() => playAfterInteraction(audio, setPlaying));
        }
    }, [shouldPlay])

    useEffect(() => {
        if (!track || !shouldPlay) return;

        const audio = track instanceof HTMLAudioElement ? track : new Audio(track);
        audioRef.current = audio;
        audio.volume = volume;
        audio.loop = true;

        const updateProgress = () => setProgress(audio.currentTime / audio.duration)
        audio.addEventListener("timeupdate", updateProgress)

        // Attempt autoplay
        audio.play()
            .then(() => setPlaying(true))
            .catch(() => playAfterInteraction(audio, setPlaying));

        return () => {
            audio.pause();
            audioRef.current = null;
            audio.removeEventListener("timeupdate", updateProgress)
        };
    }, [track]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const play = async () => {
        if (!shouldPlay) return
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
