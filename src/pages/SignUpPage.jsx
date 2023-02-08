import React from 'react';

export default function SignUpPage() {
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const file_link_ref = React.useRef(null);

  const singup = asy;

  return (
    <div>
      아이디(이메일): <input /> <br />
      비밀번호 : <input type='password' /> <br />
      이름 : <input /> <br />
      <button> 회원가입</button>
    </div>
  );
}
