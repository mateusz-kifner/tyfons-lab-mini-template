type NewType<Value> = {
	/** Whether the cell should not be editable */
	readOnly?: boolean;
	/** Class to be given for the cell element */
	className?: string;
	/** The value of the cell */
	value: Value;
	/** Custom component to render when the cell is edited, if not defined would default to the component defined for the Spreadsheet */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	DataEditor?: React.ComponentType<any>;
	/** Custom component to render when the cell is viewed, if not defined would default to the component defined for the Spreadsheet */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	DataViewer?: React.ComponentType<any>;
};

// This is approximate copy of "react-spreadsheet" types

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type CellBase<Value = any> = NewType<Value>;

type Matrix<T> = Array<Array<T | undefined>>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type UniversalCell = CellBase & { [key: string]: any };

export type UniversalMatrix = Matrix<UniversalCell>;
