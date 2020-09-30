import './index.scss';
import axios from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { RootState } from 'store';
import { Button, Modal, Rate, Input, Form } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { changeEvent } from 'reducers/events';
import { putEventUrl } from '@constants/api';

const Rating: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const isLoading = useSelector((state: RootState) => state.events.loading);
  const dispatch = useDispatch();
  const eventId = useSelector((state: RootState) => state.eventId.eventId);
  const events = useSelector((state: RootState) => state.events.data);
  const changedInd = events.findIndex((event) => event.id === eventId);
  const changed = events.find((event) => event.id === eventId);
  const feedbacks = events[changedInd].feedBack.comments
    ? events[changedInd].feedBack.comments
    : [];
  const isAddReview = events[changedInd].feedBack
    ? events[changedInd].feedBack.isEnableAddReview
    : true;
  const totalRating = Number(
    feedbacks
      .map((el) => {
        return Number(el.raiting);
      })
      .reduce((x, y) => x + y, 0),
  );

  let newTotalRating = 0;

  const comments = {
    comments: [...feedbacks],
    isEnableAddReview: isAddReview,
  };

  const changedEvent = {
    ...changed,
    feedBack: comments,
    totalRaiting: newTotalRating + totalRating,
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  const clickHandler = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const updateState = async () => {
    await axios.put(putEventUrl(events[changedInd].id), changedEvent);
    dispatch(changeEvent({ changedEvent, changedInd }));
  };

  const onFinish = (values) => {
    comments.comments.push({
      raiting: values.feedback.stars,
      text: values.feedback.review,
      author: 'author',
    });
    newTotalRating = Number(values.feedback.stars);
    updateState();
    handleOk();
  };

  return (
    <div className="rating">
      <div>
        <span className="rating-num">
          {feedbacks.length ? (totalRating / feedbacks.length).toFixed(1) : 0}
          <span className="max-rating">/5</span>
        </span>
      </div>
      <Button
        type="dashed"
        className="rating-btn"
        icon={<StarOutlined />}
        onClick={clickHandler}
      >
        Оценить
      </Button>
      <div className="reviews-amount">Всего оценок: {feedbacks.length}</div>
      <Modal
        title="Оцените задание:"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        zIndex={10}
      >
        <Form className="review-add" name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['feedback', 'stars']}
            rules={[
              {
                required: true,
                message: 'Please enter stars!',
              },
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item name={['feedback', 'review']}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Rating;
