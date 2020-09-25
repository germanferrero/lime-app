import { Banner } from '../../../../src/components/banner';
import I18n from 'i18n-js';
import { route } from 'preact-router';
import { useAppContext } from '../../../../src/utils/app.context';

export const FbwBanner = ({}) => {
	const { cancelFbw } = useAppContext();

	function onCancel() {
		cancelFbw();
		route('/');
	}

	function onOk() {
		route('firstbootwizard');
	}

	const title = I18n.t('Please configure your network');
	const description =  I18n.t(`Your router has not yet been configured, 
			you can use our wizard to incorporate it into an existing network or create a new one.
			If you ignore this message it will continue to work with the default configuration.`);

	return (
		<Banner onOk={onOk} onCancel={onCancel} title={title} description={description} />
	);
};
