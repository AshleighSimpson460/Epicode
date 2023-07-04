import React from "react";

const DirectMessage = ({ match, socket }) => {
  const chatroomId = match.params.Id;
  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">
          <div className="chatroomContent">
            <div className="message">
              <span className="otherMessage"></span>
              <span className="ownMessage"></span>
            </div>
          </div>
          <div className="chatroomActions">
            <div>
              <input
                type="text"
                name="message"
                placeholder="enter message"
                id=""
              />
            </div>
            <div>
              <button className="join">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessage;
