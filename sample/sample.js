const {cnsl, CnslConfig} = require('../dist');

// CnslConfig.scopeSeparator = '.';
// CnslConfig.showEmoji = false;

// cnsl.scoped('>>');
cnsl.grouped('Sub1', (grp) => {
  grp.scoped('Sub1');

  const grp2 = grp.group('Sub2').scoped('Sub2');

  cnsl.debug('123');

  grp.debug('was geht');

  grp2.info('Sub Info 1');
  grp2.info('Sub Info 2');
  grp2.warn('Sub 2 warn');
  grp2.error('Sub 2 error');
  grp2.log('Sub 2 log');
  grp.debug('was geht 2');

  grp2.groupEnd();
  cnsl.debug('789');
  cnsl.debug('456');
});
