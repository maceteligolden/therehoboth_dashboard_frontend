import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useGetBlogsQuery } from '@/services/blog.service';

function RecentOrders() {


  const { data, isSuccess } = useGetBlogsQuery()


  return (
    <Card>
      { isSuccess ? 
        <>
          <RecentOrdersTable cryptoOrders={data.data} />
        </>
        :

        <p>Loading</p>
      }
    </Card>
  );
}

export default RecentOrders;
