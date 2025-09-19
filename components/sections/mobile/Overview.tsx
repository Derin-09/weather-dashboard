import React from 'react'
import OverviewCard from '../../ui/overview'
import { CloudDrizzle, Droplets, Eye, Gauge, Tornado, Wind } from 'lucide-react'

const overviewContent = [
  {
    title: 'Wind Status',
    icon: Tornado,
    status: 7.50,
    unit: 'km/h',
    comment: {
      cString: '6:20 AM',
      cNumber: null,
      cIcon: null

    }
  },
  {
    title: 'UV Index',
    icon: Gauge,
    status: 5.50,
    unit: 'UV',
    comment: {
      cString: null,
      cNumber: null,
      cIcon: null

    }
  },
  {
    title: 'Humidity',
    icon: CloudDrizzle,
    status: 84,
    unit: '%',
    comment: {
      cString: `The dew point is 27° right now`,
      cNumber: 27,
      cIcon: Droplets

    }
  },
  {
    title: 'Visibility',
    icon: Wind,
    status: 0o4,
    unit: 'km',
    comment: {
      cString: 'Haze is affecting visibiity',
      cNumber: null,
      cIcon: Eye

    }
  },
]

const Overview = () => {
  return (
    <div>
      <div className=' py-4 md:py-0'>
        <p className='pb-4 md:hidden'>Today&apos;s Overview</p>
        <div className='space-y-4 md:space-y-0 md:grid grid-cols-2 md:gap-4 '>
          {overviewContent.map((oc, idx) => { 
            const Icon = oc.comment.cIcon
            return (
            <div key={idx} className=''>
              <OverviewCard props={{
                title: oc.title,
                icon: oc.icon,
                status: oc.status,
                unit: oc.unit
              }}>
                <div className='flex gap-1 items-center text-[#818085]'>
                  <div >
                    { Icon !== null && (
                      <Icon size={14}/>
                    )}
                    </div>
                  <p className='text-xs '>{oc.comment.cString}</p>
                </div>
              </OverviewCard>
            </div>
          )})}
        </div>
      </div>
    </div>
  )
}

export default Overview