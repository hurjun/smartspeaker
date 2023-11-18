import { Helmet } from 'react-helmet-async';

import { UserView2 } from 'src/sections/user/view/';

// ----------------------------------------------------------------------

export default function UserPage2() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserView2 />
    </>
  );
}
