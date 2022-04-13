// 리다이렉트될 화면
// 여기서 처리..

import axios from "axios";

const Users = () => {
  useEffect(() => {
    axios.get("http://localhost:8081/oauth").then((response) => {
      console.log(response);
    });
  }, []);
  return <h1>Users</h1>;
};

export default Users;
