import {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	NodeConnectionType
 } from 'n8n-workflow';

export class DuckDBNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'DuckDB integration for n8n',
		name: 'duckdbNode',
		icon: 'file:duckdb.svg',
		group: ['input'],
		version: 1,
		description: 'Execute queries on DuckDB',
		defaults: {
			name: 'DuckDB Node',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				description: 'SQL query to execute',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];

		return this.prepareOutputData(returnData);
	}
}
