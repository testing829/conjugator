import React from 'react';

import FrenchSettings from './French';
import SpanishSettings from './Spanish';

const Settings = ({ location }) => {
  const language = location.pathname.split('/')[1];

  if (language === 'es') return <SpanishSettings />;
  else if (language === 'fr') return <FrenchSettings />;
};

export default Settings;
