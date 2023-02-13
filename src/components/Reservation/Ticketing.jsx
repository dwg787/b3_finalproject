import React, { useState } from "react";

const Ticketing = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // process the ticket purchase here
    alert(
      `${quantity} 장의 티켓이 예약되었습니다 ${name} 님 (${email}) 로 예약발송 되셧습니다`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름 : </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="email">이메일 : </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="quantity">수량 : </label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />
      <p>시작일</p>
      <input type="date" />
      <p>종료일</p>
      <input type="date" />
      <button type="submit">장바구니담기</button>
      <button>구매하기</button>
    </form>
  );
};

export default Ticketing;
