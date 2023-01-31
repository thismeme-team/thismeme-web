export const useAuth = () => {
  /**
   * @implements
   *
   * useAuth
   * 1. method: login, logout
   * 2. property: user, isLogin
   *
   * withAuth hoc
   *   useAuth isLogin == false, return LoginModal
   *
   * getServerSideProps (로그인 모달로 처리하므로 쓸일 없을 듯)
   *   check req.header.authorization
   *   if AT not exist, return redirect to auth page
   *   else return props user data
   *
   */
};
