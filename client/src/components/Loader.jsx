import { motion } from "framer-motion";

const Loader = ({ text = "Loading..." }) => {
	return (
		<div className="flex flex-col items-center justify-center py-10">
			<motion.div
				className="h-11 w-11 rounded-full border-4 border-brand-100 border-t-brand-500"
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }}
			/>
			<p className="mt-4 text-sm text-slate-500 dark:text-slate-300">{text}</p>
		</div>
	);
};

export default Loader;
