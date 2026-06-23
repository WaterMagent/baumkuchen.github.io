export interface SystemInfo {
	ua: string;
	platform: string;
	language: string;
	screen: string;
	time: string;
	date: string;
}

const isBrowser = typeof navigator !== 'undefined' && typeof window !== 'undefined';

export function getSystemInfo(): SystemInfo {
	const now = new Date();
	return {
		ua: isBrowser ? navigator.userAgent : '',
		platform: isBrowser ? navigator.platform : '',
		language: isBrowser ? navigator.language : '',
		screen: isBrowser ? `${window.screen.width}x${window.screen.height}` : '',
		time: now.toLocaleTimeString('zh-CN', { hour12: false }),
		date: now.toLocaleDateString('zh-CN')
	};
}
