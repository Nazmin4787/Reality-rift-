
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
	const heroRef = useRef(null);
	const revealRef = useRef(null);

	useEffect(() => {
		const hero = heroRef.current;
		const reveal = revealRef.current;

		let mouseX = 0;
		let mouseY = 0;
		let x = 0;
		let y = 0;
		let visible = false;

		const animate = () => {
			x += (mouseX - x) * 0.05;
			y += (mouseY - y) * 0.05;

			reveal.style.setProperty('--x', `${x}px`);
			reveal.style.setProperty('--y', `${y}px`);

			requestAnimationFrame(animate);
		};

		animate();

		const move = (e) => {
			const rect = hero.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;

			if (!visible) {
				visible = true;
				reveal.classList.add('active');
			}
		};

		const leave = () => {
			visible = false;
			reveal.classList.remove('active');
		};

		hero.addEventListener('mousemove', move);
		hero.addEventListener('mouseleave', leave);

		return () => {
			hero.removeEventListener('mousemove', move);
			hero.removeEventListener('mouseleave', leave);
		};
	}, []);

	return (
		<div className="hero" ref={heroRef}>
			<motion.div
				className="fire-reveal"
				ref={revealRef}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			/>
		</div>
	);
};

export default Hero;
