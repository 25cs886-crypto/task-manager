import { AnimatePresence, motion } from "framer-motion";

const ConfirmationModal = ({
	open,
	title,
	description,
	onConfirm,
	onCancel,
	confirmLabel = "Confirm",
}) => {
	return (
		<AnimatePresence>
			{open ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-5"
				>
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 10, opacity: 0 }}
						className="w-full max-w-md rounded-3xl bg-white p-6 shadow-panel dark:bg-slate-900"
					>
						<h3 className="text-xl font-bold">{title}</h3>
						<p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
							{description}
						</p>
						<div className="mt-5 flex justify-end gap-3">
							<button
								type="button"
								onClick={onCancel}
								className="focus-ring rounded-xl border border-slate-200 px-4 py-2 text-sm"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={onConfirm}
								className="focus-ring rounded-xl bg-rose-600 px-4 py-2 text-sm text-white"
							>
								{confirmLabel}
							</button>
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};

export default ConfirmationModal;
