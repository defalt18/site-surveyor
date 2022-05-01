import { filter, isEmpty, map, reduce, size } from 'lodash';

export const getVideoErrors = (videoNodes: NodeListOf<HTMLVideoElement>) => {
	const concernedVideoNodes = filter(videoNodes, (video) => !isEmpty(video.src));
	const subWarnings = map(concernedVideoNodes, (videoNode) => ({
		records: [
			{ key: 'Source src', value: `"${videoNode.src}"`, meta: 'link' },
			{ key: 'Track', value: 'empty' },
		],
	}));
	const subErrors = reduce(
		concernedVideoNodes,
		(acc, node) => {
			const validNodesWithTitle = filter(node.childNodes, { localName: 'title' });
			const validNodesWithTrack = filter(node.childNodes, { localName: 'track' });
			if (isEmpty(validNodesWithTitle)) {
				const [titleErrors] = acc;
				acc[0] = [
					...titleErrors,
					{
						records: [
							{ key: 'Source src', value: node.src, meta: 'link' },
							{ key: 'Accessible Name', value: 'empty' },
						],
					},
				];
			}

			if (isEmpty(validNodesWithTrack)) {
				const [, trackErrors] = acc;
				acc[1] = [
					...trackErrors,
					{
						records: [
							{ key: 'Source src', value: node.src, meta: 'link' },
							{ key: 'Track', value: 'empty' },
						],
					},
				];
			}

			return acc;
		},
		[[], []]
	);

	const errors = reduce(
		[subWarnings, subErrors[0], subErrors[1]],
		(res, item, index) => {
			if (index === 0) {
				if (!isEmpty(item))
					return [
						...res,
						{
							title: 'Provide synchronized audio descriptions for videos',
							errorType: 'warning',
							tags: [
								{ name: '1.2.1', color: 'bg-orange-primary' },
								{ name: 'Level A', color: 'bg-orange-primary' },
							],
							subErrorCount: size(subWarnings),
							subErrors: subWarnings,
							tips: [
								{
									description:
										'Provide a text transcript that conveys the same information as video-only media or Provide an audio-track that conveys the same information as video-only media.',
								},
							],
						},
					];
			}
			if (index === 1) {
				if (!isEmpty(item)) {
					return [
						...res,
						{
							title: 'Absence of accessible name for video',
							errorType: 'error',
							tags: [
								{ name: '1.1.1', color: 'bg-orange-primary' },
								{ name: 'Level A', color: 'bg-orange-primary' },
							],
							subErrorCount: size(item),
							subErrors: item,
							tips: [
								{
									description: `A &lt;title&gt; tag that briefly describes the video or gives its title is provided so that users know what it is when they encounter it and can decide what action if any they want to take with it`,
								},
							],
						},
					];
				}
			}
			if (index === 2) {
				if (!isEmpty(item)) {
					return [
						...res,
						{
							title: 'Absence of child <track> in <video> tag',
							errorType: 'error',
							tags: [
								{ name: '1.2.1', color: 'bg-orange-primary' },
								{ name: 'Level A', color: 'bg-orange-primary' },
							],
							subErrorCount: size(item),
							subErrors: item,
						},
					];
				}
			}

			return res;
		},
		[]
	);

	return {
		errors,
		type:
			size(subErrors[0]) > 0 || size(subErrors[1])
				? 'error'
				: size(subWarnings) > 0
				? 'warning'
				: 'success',
	};
};

export const getAudioErrors = (audioNodes: NodeListOf<HTMLAudioElement>) => {
	const concernedAudioNodes = filter(audioNodes, (audio) => !isEmpty(audio.src));
	const audioTitleErrors = reduce(
		concernedAudioNodes,
		(res, item) => {
			const titleNodes = filter(item.childNodes, { localName: 'title' });
			if (isEmpty(titleNodes)) {
				return [
					...res,
					{
						records: [
							{ key: 'Source src', value: item.src, meta: 'link' },
							{ key: 'Accessible name', value: 'empty' },
						],
					},
				];
			}
			return res;
		},
		[]
	);
	const audioControlErrors = reduce(
		filter(audioNodes, { controls: false }),
		(acc, item) => [
			...acc,
			{
				records: [
					{ key: 'Source src', value: item.src, meta: 'link' },
					{ key: 'Autoplay', value: 'On' },
				],
			},
		],
		[]
	);

	const allAudioErrors = reduce(
		[audioTitleErrors, audioControlErrors],
		(res, item, index) => {
			if (index === 0) {
				if (!isEmpty(item)) {
					return [
						...res,
						{
							title: 'Absence of accessible name for audio',
							subErrorCount: size(item),
							subErrors: item,
							tags: [
								{ name: '1.1.1', color: 'bg-orange-primary' },
								{ name: 'Level A', color: 'bg-orange-primary' },
							],
							errorType: 'error',
							tips: [
								{
									description:
										'A <title> tag that briefly describes the audio or gives its title is provided so that users know what it is when they encounter it and can decide what action if any they want to take with it. ',
								},
							],
						},
					];
				}
			}

			if (index === 1) {
				if (!isEmpty(audioControlErrors)) {
					return [
						...res,
						{
							title: 'Absence of controls for audio',
							subErrorCount: size(item),
							subErrors: item,
							tags: [
								{ name: '1.4.2', color: 'bg-orange-primary' },
								{ name: 'Level A', color: 'bg-orange-primary' },
							],
							errorType: 'error',
						},
					];
				}
			}

			return res;
		},
		[]
	);

	return {
		type: !isEmpty(audioControlErrors) || !isEmpty(audioTitleErrors) ? 'error' : 'success',
		totalCount: size(allAudioErrors[0]) + size(allAudioErrors[1]),
		errors: allAudioErrors,
	};
};
