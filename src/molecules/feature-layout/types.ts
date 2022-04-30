import { ReactNode, ComponentType, SVGProps } from 'react';

export type STATUS_TYPE = 'warning' | 'error' | 'success';

export type ErrorDetailsType = {
	name: string;
	count: number;
	errors?: Array<{
		title: string;
		errorType?: STATUS_TYPE;
		subErrorCount?: number;
		subErrors?: Array<any>;
		tips?: Array<{ description: string }>;
		tags?: Array<{ name: string; color?: string }>;
	}>;
};

export type AnalysisErrors = Record<string, ErrorDetailsType>;

export interface LayoutContainerProps {
	title: string;
	description?: string;
	errorRenderer: (error: any, index: number, array: Array<any>) => ReactNode;
	checkpoints: Array<{
		name: string;
		icon?: ComponentType<SVGProps<any>>;
		tags?: Array<{ name: string; color?: string }>;
		ErrorAccordion?: ComponentType<any>;
		errorRenderer?: (error: any, index: number, array: Array<any>) => ReactNode;
		tips?: Array<{ description: string }>;
	}>;
	testingEnabled?: boolean;
	checkUtility: (dom: Document, tabId: number) => Promise<AnalysisErrors>;
}

export interface ErrorAccordionProps {
	title: string;
	type: STATUS_TYPE;
	errorCount?: number;
	subErrors?: Array<any>;
	tags?: Array<{ name: string; color?: string }>;
	tips?: Array<{ description: string }>;
	ErrorRenderer?: LayoutContainerProps['errorRenderer'];
}
