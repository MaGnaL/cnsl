import {Cnsl, cnsl} from './cnsl.class';

describe('Cnsl', () =>
{
  it('should exist', () =>
  {
    expect(Cnsl)
      .toBeDefined();
  });
});

describe('cnsl', () =>
{
  it('should exist', () =>
  {
    expect(cnsl)
      .toBeDefined();
  });

  it('should create a group', () =>
  {
    let cnslGrp:any = cnsl.group('foobar');
    expect(cnslGrp)
      .toBeDefined();
    expect(cnslGrp instanceof Cnsl)
      .toBeTruthy();
  });

  it('should have all needed methods', () =>
  {
    expect(cnsl.group)
      .toBeDefined();
    expect(cnsl.groupCollapsed)
      .toBeDefined();
    expect(cnsl.groupEnd)
      .toBeDefined();
    expect(cnsl.assert)
      .toBeDefined();
    expect(cnsl.clear)
      .toBeDefined();
    expect(cnsl.count)
      .toBeDefined();
    expect(cnsl.debug)
      .toBeDefined();
    expect(cnsl.dir)
      .toBeDefined();
    expect(cnsl.dirxml)
      .toBeDefined();
    expect(cnsl.error)
      .toBeDefined();
    expect(cnsl.info)
      .toBeDefined();
    expect(cnsl.log)
      .toBeDefined();
    expect(cnsl.msIsIndependentlyComposed)
      .toBeDefined();
    expect(cnsl.profile)
      .toBeDefined();
    expect(cnsl.profileEnd)
      .toBeDefined();
    expect(cnsl.select)
      .toBeDefined();
    expect(cnsl.time)
      .toBeDefined();
    expect(cnsl.timeEnd)
      .toBeDefined();
    expect(cnsl.trace)
      .toBeDefined();
    expect(cnsl.warn)
      .toBeDefined();
  });
});
