import { Button, DatePicker, Form, Input, Layout, Space } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/configStore';
import {
  editBookingByIdApi,
  getBookingByIdApi,
} from '../../redux/reducer/managementBookingReducer';
import { BookRoomModel } from '../../redux/reducer/RoomReducer';

type Props = {};

const { Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

export default function EditBooking({}: Props) {
  const { bookingEdit }: { bookingEdit: BookRoomModel } = useSelector(
    (state: RootState) => state.managementBookingReducer
  );
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const id = parseInt(params.id as string);
    const data = {
      ...values,
      ngayDen: moment(values['ngayDen']).add(1, 'days'),
      ngayDi: moment(values['ngayDi']).add(1, 'days'),
    };
    dispatch(editBookingByIdApi({ id, ...data }));
    navigate(-1);
  };

  useEffect(() => {
    const { id } = params;
    dispatch(getBookingByIdApi(parseInt(id as string)));
  }, [params.id]);

  useEffect(() => {
    if (bookingEdit) {
      form.setFieldsValue({
        maPhong: bookingEdit.maPhong,
        maNguoiDung: bookingEdit.maNguoiDung,
        ngayDen:
          bookingEdit.ngayDen !== null ? moment(bookingEdit.ngayDen) : '',
        ngayDi: bookingEdit.ngayDi !== null ? moment(bookingEdit.ngayDi) : '',
        soLuongKhach: bookingEdit.soLuongKhach,
      });
    }
  }, [params.id,bookingEdit]);

  return (
    <Content
      className='site-content site-layout-background'
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 650,
      }}
    >
      <div className='title'>
        <h3 className='content-title'>Ch???nh s???a ????n ?????t ph??ng</h3>
      </div>
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
        name={'editBooking'}
      >
        <Form.Item
          label='M?? ph??ng'
          name={'maPhong'}
          rules={[
            {
              required: true,
              message: 'Please input this field',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='M?? ng?????i d??ng'
          name={'maNguoiDung'}
          rules={[
            {
              required: true,
              message: 'Please input this field',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Ng??y ?????n'
          name={'ngayDen'}
          rules={[
            {
              required: true,
              message: 'Please input this field',
            },
          ]}
        >
          <DatePicker format={'DD/MM/YYYY'} placeholder='Ch???n ng??y ?????n' />
        </Form.Item>
        <Form.Item
          label='Ng??y ??i'
          name={'ngayDi'}
          rules={[
            {
              required: true,
              message: 'Please input this field',
            },
          ]}
        >
          <DatePicker format={'DD/MM/YYYY'} placeholder='Ch???n ng??y ??i' />
        </Form.Item>
        <Form.Item
          label='S??? l?????ng kh??ch'
          name={'soLuongKhach'}
          rules={[
            {
              required: true,
              message: 'Please input this field',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
          <Space size={'middle'}>
            <Button type='primary' htmlType='submit'>
              Edit Booking
            </Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Content>
  );
}
