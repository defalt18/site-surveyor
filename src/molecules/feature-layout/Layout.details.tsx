import React from 'react';
import { LayoutContainerProps } from './types';
import { VIEWS } from './consts';
import { isUndefined, map, noop } from 'lodash';
import { SkeletonIntroduction, SkeletonSection } from '../skeleton';
import FeatureButton from './components/FeatureButton';
import { LayoutContext } from './Layout.container';
import usePageDom from '../../modules/hooks/usePageDom';
import Loader from '../loader';

const LayoutDetails = (props: LayoutContainerProps) => {
	const { title, description, checkpoints, checkUtility, testingEnabled = true } = props;
	const { dom, tabId } = usePageDom();
	const [loading, setLoading] = React.useState<boolean>(false);
	const { errors, setErrors, setView } = React.useContext(LayoutContext);

	const onClickTest = React.useCallback(async () => {
		setLoading(true);
		const analysisErrors = await checkUtility(dom, tabId);
		setErrors(analysisErrors);
		setLoading(false);
	}, [checkUtility, setErrors, dom, tabId, setLoading]);

	const onClickFeature = React.useCallback(
		(checkpointName: string) => {
			if (isUndefined(errors)) return noop;
			setView({ view: VIEWS.REPORT, checkpoint: checkpointName });
		},
		[errors, setView]
	);

	return (
		<div className='flex flex-col gap-y-[0.8rem] flex-grow'>
			<SkeletonIntroduction title={title} description={description} />
			<SkeletonSection
				disabled={!testingEnabled || loading}
				onClick={onClickTest}
				buttonLabel={isUndefined(errors) ? 'Test' : 'Test again'}
				title='Accessibility check-points'
				className='flex flex-col flex-1 rounded-lg'
			>
				{loading ? (
					<Loader />
				) : (
					<div className='grid grid-cols-2 gap-x-[0.9rem] gap-y-[0.8rem] mt-[2.8rem]'>
						{map(checkpoints, ({ name, icon }, index) => (
							<FeatureButton
								key={index}
								label={name}
								icon={icon}
								onClick={() => onClickFeature(name)}
								showErrors={!isUndefined(errors)}
								errorCount={errors ? errors[name].count : undefined}
								state={errors ? errors[name].type : undefined}
							/>
						))}
					</div>
				)}
			</SkeletonSection>
		</div>
	);
};

export default React.memo(LayoutDetails);
