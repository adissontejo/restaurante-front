import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Info = styled.div`
  flex: 1;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const Role = styled.div`
  font-size: 14px;
  color: #888;
`;

export const EditButton = styled.button`
  background-color: #8b4513;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #6b3210;
  }
`;
