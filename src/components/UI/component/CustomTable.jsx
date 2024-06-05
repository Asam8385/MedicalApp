import React from 'react';
import { ConfigProvider, Table } from 'antd';

const CustomTable = ({
  dataSource,
  columns,
  loading,
  pageSize,
  totalPages,
  showPagination = true,
  onPaginationChange,
  onTableChange,
  showSizeChanger
}) => {
  const paginationConfig = showPagination ? {
    pageSize: pageSize,
    total: totalPages,
    pageSizeOptions: [5, 10, 20],
    showSizeChanger: showSizeChanger,
    onChange: onPaginationChange,
    showPagination: true
  } : false;

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius : 10,
          colorTextHeading: '#fff'
        },
        components: {
          Table: {
            headerBg : '#000',
            borderColor : '#fff',
            rowHoverBg :  '#e6f4ff',

          },
        },
      }}
    >
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        onChange={onTableChange}
        pagination={paginationConfig}
        scroll={{ y: 420 }}
      />
    </ConfigProvider>
  );
}

export default CustomTable;
