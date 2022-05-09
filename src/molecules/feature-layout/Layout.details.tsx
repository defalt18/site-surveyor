import React from 'react';
import c from 'classnames';
import { LayoutContainerProps } from './types';
import { VIEWS } from './consts';
import { isEmpty, isUndefined, map, noop } from 'lodash';
import { SkeletonIntroduction, SkeletonSection } from '../skeleton';
import FeatureButton from './components/FeatureButton';
import usePageDom from '../../modules/hooks/usePageDom';
import Loader from '../loader';
import { CSVLink } from 'react-csv';
import useLayoutContext from './hooks/useLayoutContext';
import { getCSVProps } from './utils';

const LayoutDetails = (props: LayoutContainerProps) => {
	const { title, description, checkpoints, checkUtility, testingEnabled = true } = props;
	const { dom, tabId, otherAttribs } = usePageDom();
	const [loading, setLoading] = React.useState<boolean>(false);
	const { errors, setErrors, setView } = useLayoutContext();

	const onClickTest = React.useCallback(async () => {
		setLoading(true);
		const analysisErrors = await checkUtility(dom, tabId, otherAttribs);
		setErrors(analysisErrors);
		setLoading(false);
	}, [checkUtility, setErrors, dom, tabId, setLoading, otherAttribs]);

	const onClickFeature = React.useCallback(
		(checkpointName: string) => {
			if (isUndefined(errors)) return noop;
			setView({ view: VIEWS.REPORT, checkpoint: checkpointName });
		},
		[errors, setView]
	);

	const csvProps = !isUndefined(errors) ? getCSVProps(errors, title, dom?.title) : undefined;

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
						{map(checkpoints, ({ name, icon }, index) => {
							return (
								<FeatureButton
									key={index}
									label={name}
									icon={icon}
									onClick={() => onClickFeature(name)}
									showErrors={!isUndefined(errors)}
									errors={errors ? errors[name]?.errors : undefined}
								/>
							);
						})}
					</div>
				)}
				{!isUndefined(errors) && !isEmpty(csvProps?.data) && (
					<CSVLink
						{...csvProps}
						className={c(
							'm-[3.5rem] mt-[4.8rem] rounded-full px-[4.8rem] py-[1.6rem] bg-navy-primary text-primary text-white text-center relative'
						)}
					>
						<span className='text-small text-white absolute top-4 right-6 font-bold'>BETA</span>
						Download Report {'>'}
					</CSVLink>
				)}
			</SkeletonSection>
		</div>
	);
};

export default React.memo(LayoutDetails);
