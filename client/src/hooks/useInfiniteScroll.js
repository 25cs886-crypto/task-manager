import { useEffect, useRef } from "react";

const useInfiniteScroll = (onIntersect, enabled = true) => {
	const observerRef = useRef(null);
	const targetRef = useRef(null);

	useEffect(() => {
		if (!enabled || !targetRef.current) {
			return;
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					onIntersect();
				}
			},
			{ threshold: 0.3 },
		);

		observerRef.current.observe(targetRef.current);

		return () => {
			observerRef.current?.disconnect();
		};
	}, [enabled, onIntersect]);

	return targetRef;
};

export default useInfiniteScroll;
