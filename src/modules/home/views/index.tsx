import * as React from 'react';
import c from 'classnames';
import { FEATURES } from '../consts';
import { map, keys } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { SkeletonSection } from '../../../molecules/skeleton';

export default function Home() {
	const navigation = useNavigate();
	return (
		<div className='flex flex-col gap-y-[1.4rem] pb-[1.4rem]'>
			{map(keys(FEATURES), (key) => (
				<SkeletonSection
					key={key}
					className={c('rounded-lg px-[1.2rem] py-[2.9rem]')}
					title={key}
					titleClassName='text-primary mb-[2.6rem] text-dark-primary'
				>
					<div className='grid grid-cols-2 gap-x-[0.9rem] gap-y-[0.8rem]'>
						{map(FEATURES[key].data, ({ disabled = true, ...item }, index) => {
							const Icon = item.icon ?? null;
							return (
								<button
									onClick={() => navigation(item.path, { state: { details: '/' } })}
									disabled={disabled}
									key={index}
									className={c(
										'rounded-lg h-[10.2rem] text-primary text-white flex items-center',
										FEATURES[key].bgColor
									)}
								>
									<p className='text-primary pl-[2rem] w-4/6 text-left'>{item.name}</p>
									{!!Icon && <Icon className={item.iconClassName} />}
								</button>
							);
						})}
					</div>
				</SkeletonSection>
			))}
		</div>
	);
}
