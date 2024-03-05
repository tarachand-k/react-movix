import React from "react";
import styled from "styled-components";

const SwitchTabs = ({ tabs, onTabChange }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [left, setLeft] = React.useState(0);
  const tabsMemo = React.useMemo(() => tabs, []);

  const handleActiveTab = (tab, idx) => {
    setLeft(idx * 100);
    setTimeout(() => {
      setSelectedTab(idx);
    }, 300);
    onTabChange(tab);
  };

  return (
    <Wrapper>
      <TabItems>
        {tabsMemo.map((tab, idx) => (
          <TabItem
            key={idx}
            className={selectedTab === idx ? "active" : ""}
            onClick={() => handleActiveTab(tab, idx)}
          >
            {tab}
          </TabItem>
        ))}
        <MovingBg style={{ left }} />
      </TabItems>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 34px;
  background-color: white;
  border-radius: 20px;
  padding: 2px;
`;

const TabItems = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  position: relative;
`;

const TabItem = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  color: var(--black);
  font-size: ${14 / 16}rem;
  position: relative;
  background-color: transparent;
  z-index: 1;
  cursor: pointer;
  transition: color ease 0.3s;
  &.active {
    color: white;
  }
`;

const MovingBg = styled.span`
  height: 30px;
  width: 100px;
  border-radius: 15px;
  background-image: var(--gradient);
  position: absolute;
  left: 0;
  transition: left cubic-bezier(0.88, -0.35, 0.565, 1.35) 0.4s;
`;

export default React.memo(SwitchTabs);
