import React from 'react';
import c from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	state?: 'error' | 'success' | 'warning';
	icon: () => JSX.Element;
	showErrors?: boolean;
	errorCount?: number;
	containerClassName?: string;
}

const LABELS: Record<ButtonProps['state'], string> = {
	error: 'View Errors >',
	warning: 'View Warnings >',
	success: 'All set!',
};

const COLORS: Record<string, Record<ButtonProps['state'], string>> = {
	background: {
		error: 'bg-red-primary',
		warning: 'bg-yellow-primary',
		success: 'bg-green-primary',
	},
	text: {
		error: 'text-red-primary',
		warning: 'text-yellow-primary',
		success: 'text-green-primary',
	},
	border: {
		error: 'border-red-primary',
		warning: 'border-yellow-primary',
		success: 'border-green-primary',
	},
};

const ErrorCircle = (props: ButtonProps) => {
	const { state = 'success', errorCount } = props;
	const label = state === 'warning' ? 'Warnings' : 'Errors';
	return (
		<div className='flex flex-col items-center gap-y-2'>
			<div
				className={c(
					'rounded-full h-[3.5rem] w-[3.5rem] flex items-center justify-center border',
					COLORS['border'][state]
				)}
			>
				<p className={c('text-primary truncate overflow-ellipsis', COLORS['text'][state])}>
					{errorCount}
				</p>
			</div>
			<p className={c('text-small', COLORS['text'][state])}>{label}</p>
		</div>
	);
};

const FeatureButton = (props: ButtonProps) => {
	const {
		label,
		state = 'success',
		icon,
		className,
		containerClassName,
		showErrors,
		errorCount,
		...rest
	} = props;
	const Icon = icon ?? undefined;

	return (
		<div
			className={c(
				'rounded-lg overflow-hidden max-h-[11.6rem] border border-brown-primary',
				containerClassName
			)}
		>
			<div
				className={c(
					'flex flex-row items-center justify-between w-full bg-white',
					showErrors ? 'h-[8rem]' : 'h-[10.4rem]'
				)}
			>
				<p className='pl-[2rem] text-primary text-dark-primary w-4/6'>{label}</p>
				<div className={showErrors ? 'mr-6' : 'mr-3'}>
					{!showErrors ? <Icon /> : <ErrorCircle {...props} />}
				</div>
			</div>
			{!!showErrors && (
				<button
					className={c(
						'h-[3.6rem] flex justify-center items-center w-full',
						COLORS.background[state],
						className
					)}
					{...rest}
					disabled={Boolean(state === 'success' || rest.disabled || errorCount === 0)}
				>
					<p className='text-tertiary text-white'>{LABELS[state]}</p>
				</button>
			)}
		</div>
	);
};

export default React.memo(FeatureButton);
