export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    //根据后端传来的LoginUserVO中的userRole判断是否是管理员
    canAdmin: currentUser && currentUser.userRole === 'admin',
  };
}
