import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashProps {
    onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Show splash for 2.5 seconds, then start exit animation
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence
            onExitComplete={() => {
                // Called when the exit animation finishes
                onComplete();
            }}
        >
            {isVisible && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                duration: 1.2,
                                ease: "easeOut"
                            }
                        }}
                        exit={{
                            scale: 1.1,
                            opacity: 0,
                            transition: { duration: 0.5 }
                        }}
                        className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-podPurple/20 blur-3xl rounded-full" />

                        <img
                            src="/images/podmark_logo.svg"
                            alt="Podmark Logo"
                            className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
