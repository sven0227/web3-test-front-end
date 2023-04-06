
export default function MyPage() {
  return (
    <div>
      <h1>Voldo's assesments test</h1>
      <h2>
        <span style={{ marginRight: 10 }}>- Please see my answers on</span>
        <a
          target={"_blank"}
          href="https://docs.google.com/document/d/1-Pn3qItQc5U6PhMwplVlrcCqt9ZhK_9BucyUICq4_ec/edit?usp=sharing">
          Google doc.
        </a >
      </h2>
      <h2>
        <span style={{ marginRight: 10 }}>- Please see front-end live site at</span>
        <a
          target={"_blank"}
          href="https://sven-web3-test-front-end.onrender.com/">
          https://sven-web3-test-front-end.onrender.com
        </a >
      </h2>
      <h2>
        <span style={{ marginRight: 10 }}>- Please see front-end repo at</span>
        <a
          target={"_blank"}
          href="https://github.com/sven0227/web3-test-front-end">
          https://github.com/sven0227/web3-test-front-end.
        </a >
      </h2>
      <p>
        I used Next.js and Axios to call backend api.
        You can see the backend server status, transfer history and token holder list.
      </p>
      <h2>
        <span style={{ marginRight: 10 }}>- Please see back-end repo at</span>
        <a
          target={"_blank"}
          href="https://github.com/sven0227/web3-test-back-end">
          https://github.com/sven0227/web3-test-back-end.
        </a >
      </h2>
      <p>
        I used Express.js and Ethers.js to get data via infra from MainNet.
        You can see the backend server status, transfer history and token holder list.
      </p>
      <h2>
        <span style={{ marginRight: 10 }}>- Please see attacker contract repo at</span>
        <a
          target={"_blank"}
          href="https://github.com/sven0227/sven-web3-test-attacker-contract">
          https://github.com/sven0227/sven-web3-test-attacker-contract.
        </a >
      </h2>
      <p>
        I used hardHat.
      </p>
    </div>
  );
}