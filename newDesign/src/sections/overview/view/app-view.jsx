import { faker } from '@faker-js/faker';


import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        병원 정보
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="병원 내 전체 환자 수"
            total={1782}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="담당 환자 수"
            total={40}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="당일 입원 환자 수"
            total={12}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="당일 퇴원 환자 수"
            total={16}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="환자 방문 추이"
            subheader="작년보다 (+43%) 변경되었습니다."
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: '중증 환자',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: '경증 환자',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: '방문객',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="진료 과목별 환자 "
            chart={{
              series: [
                { label: '간호사', value: 7344 },
                { label: '의사', value: 2435 },
                { label: '행정원', value: 1443 },
                { label: '경비원', value: 443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="진료 과목별 환자 수"
            subheader="작년보다 환자가 (+43%)변경되었습니다."
            chart={{
              series: [
                { label: '소아과', value: 400 },
                { label: '심장내과', value: 430 },
                { label: '안과', value: 448 },
                { label: '영상의학과', value: 470 },
                { label: '외과', value: 540 },
                { label: '응급의학과', value: 580 },
                { label: '이비인후과', value: 690 },
                { label: '재활의학과', value: 1100 },
                { label: '치과', value: 1200 },
                { label: '정형외과', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="병원 평가"
            chart={{
              categories: ['진료 기능', '의료 기능', '인력', '장비', '서비스', '시설'],
              series: [
                { name: '보건복지부', data: [80, 50, 30, 40, 100, 20] },
                { name: '전문기자협의회', data: [20, 30, 40, 80, 20, 80] },
                { name: '환자', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        {/*<Grid xs={12} md={6} lg={8}>*/}
        {/*  <AppNewsUpdate*/}
        {/*    title="환자 정보"*/}
        {/*    list={[...Array(5)].map((_, index) => ({*/}
        {/*      id: faker.string.uuid(),*/}
        {/*      title: faker.person.jobTitle(),*/}
        {/*      description: faker.commerce.productDescription(),*/}
        {/*      image: `/assets/images/covers/cover_${index + 1}.jpg`,*/}
        {/*      postedAt: faker.date.recent(),*/}
        {/*    }))}*/}
        {/*  />*/}
        {/*</Grid>*/}

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '정형외과 업무회의',
                '외과의사 업무회의',
                '간호사 업무날짜 조정 회의',
                '신규 간호사 면접',
                '명예퇴직자 축하공연 준비',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        {/*<Grid xs={12} md={6} lg={4}>*/}
        {/*  <AppTrafficBySite*/}
        {/*    title="Traffic by Site"*/}
        {/*    list={[*/}
        {/*      {*/}
        {/*        name: 'FaceBook',*/}
        {/*        value: 323234,*/}
        {/*        icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,*/}
        {/*      },*/}
        {/*      {*/}
        {/*        name: 'Google',*/}
        {/*        value: 341212,*/}
        {/*        icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,*/}
        {/*      },*/}
        {/*      {*/}
        {/*        name: 'Linkedin',*/}
        {/*        value: 411213,*/}
        {/*        icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,*/}
        {/*      },*/}
        {/*      {*/}
        {/*        name: 'Twitter',*/}
        {/*        value: 443232,*/}
        {/*        icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*  />*/}
        {/*</Grid>*/}

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="오늘 해야 할 일"
            list={[
              { id: '1', name: '의료진 회진 참석하기' },
              { id: '2', name: '정기집계 약물 챙기기' },
              { id: '3', name: '외래 환자 병실 확인하기' },
              { id: '4', name: '정형외과 협진내용 확인하기' },
              { id: '5', name: '병동지원인력소에 연락하기' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
