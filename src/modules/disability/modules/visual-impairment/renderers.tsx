import React from 'react';
import { map } from 'lodash';
import { css } from '@emotion/css';
import c from 'classnames';

const gridAutoStyles = css`
	grid-template-columns: max-content auto;
`;

export default function ContrastErrorRenderer(error: any, index: number) {
	const { records } = error;
	return (
		<div
			key={index}
			className={c(
				'grid gap-y-3 gap-x-8 bg-white border border-t-0 border-brown-primary px-[1.9rem] py-[0.9rem] last:rounded-b-lg',
				gridAutoStyles
			)}
		>
			{map(records as Array<any>, ({ key, value, foreground, background }, ind) => {
				const isLast = ind === records.length - 1;
				const foregroundStyles = isLast ? { backgroundColor: foreground } : null;
				const backgroundStyles = isLast ? { backgroundColor: background } : null;
				return (
					<React.Fragment key={ind}>
						<p className='text-tertiary text-gray-primary flex-shrink-0'>{key}</p>
						{!isLast ? (
							<p className='text-tertiary text-dark-primary line-clamp-1 overflow-ellipsis'>
								{value}
							</p>
						) : (
							<div className='flex flex-row items-center gap-x-2 flex-shrink-0'>
								<div className='h-6 w-6 border border-brown-primary' style={foregroundStyles} />
								<div className='h-6 w-6 border border-brown-primary' style={backgroundStyles} />
							</div>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
}
