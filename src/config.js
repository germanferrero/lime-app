import Meta from '../plugins/lime-plugin-core';
import Align from '../plugins/lime-plugin-align';
import Locate from '../plugins/lime-plugin-locate';
import Metrics from '../plugins/lime-plugin-metrics';
import Notes from '../plugins/lime-plugin-notes';
import Rx from '../plugins/lime-plugin-rx';

// REGISTER PLUGINS
export const plugins = [
	Rx,
	Meta,
	Align,
	Locate,
	Metrics,
	Notes
];