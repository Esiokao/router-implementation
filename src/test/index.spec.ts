import CustomRouter from '../router/index';

describe('Name of the group', () => {
  it('should be a insatance of Router', () => {
    const router = new CustomRouter();
    expect(router).toBeInstanceOf(CustomRouter);
  });
});
