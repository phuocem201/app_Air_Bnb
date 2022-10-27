import React, { useEffect } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  EditOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import {
  getAllUserApi,
  UserModal,
} from '../../redux/reducer/managementUserReducer';
import moment from 'moment';

type Props = {};


const scroll: { y?: number | string } = {};
scroll.y = 580;

export default function TableLocation({}: Props) {
  const { arrUser } = useSelector(
    (state: RootState) => state.managementUserReducer
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserApi());
  }, []);

  return (
    // <Table
    //   columns={columns}
    //   dataSource={arrUser}
    //   pagination={{ pageSize: 15, showSizeChanger: false }}
    //   scroll={scroll}
    // />
    <div>alert</div>
  );
}
