import { useAppContext } from './app.context';
import { SharedPasswordLogin } from '../containers/SharedPasswordLogin';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { Loading } from '../components/loading';
import I18n from 'i18n-js';
import { FbwBanner } from '../../plugins/lime-plugin-fbw/src/containers/FbwBanner';


export const Route = ({ path, children }) => {
	const { suCounter, loading, fbwConfigured, fbwCanceled, unexpectedError } = useAppContext();

	if (unexpectedError) {
		return (
			<div class="container container-center">
				{I18n.t('Un unexpected error occurred, please contact the developer team')}
			</div>
		);
	}

	if (loading) {
		return (
			<div class="container container-center">
				<Loading />;
			</div>
		);
	}

	const tryingToConfirmUpgrade = (path === 'firmware') && (suCounter > 0);
	if (path !== 'firstbootwizard' && !fbwConfigured && !fbwCanceled && !tryingToConfirmUpgrade) {
		return <FbwBanner />
	}

	return children;
};

export const CommunityProtectedRoute = ({ path, children }) => {
	const { isRoot, loginAsRoot } = useAppContext();
	const [loading, setloading] = useState(true);

	useEffect(() => {
		function tryToLoginAutomatically() {
			loginAsRoot('')
				.then(() => setloading(false))
				.catch(() => setloading(false));
		}
		if (!isRoot) {
			tryToLoginAutomatically()
		}
	}, [loginAsRoot, isRoot])

	if (loading) {
		<div class="container container-center">
			<Loading />;
		</div>
	}

	if (!isRoot) {
		return <Route path={path}><SharedPasswordLogin /></Route>;
	}
	return <Route path={path}>{children}</Route>;
};

export const Redirect = ({ to }) => {
	useEffect(() => {
		route(to, true);
	}, [to]);
	return null;
};
