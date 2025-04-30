import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { getChartTheme } from '../../utils/houseTheme';

// Reusable chart container component
const ChartContainer = memo(({ title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="glass-card p-4 sm:p-5 md:p-6 rounded-xl shadow-lg border border-dark-800/50 overflow-hidden mb-6 sm:mb-8 last:mb-0"
  >
    <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
      {title}
      <div className="ml-auto h-1 flex-grow max-w-12 sm:max-w-16 bg-brand-500/50 rounded-full"></div>
    </h3>
    
    <div className="h-[280px] sm:h-[320px] md:h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </motion.div>
));

// Set display name for memoized component
ChartContainer.displayName = 'ChartContainer';

// Custom tooltip component
const CustomTooltip = memo(({ active, payload, label, houses }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-900 p-3 rounded-lg shadow-lg border border-dark-700 text-xs sm:text-sm">
        <p className="text-white font-bold mb-1.5">{payload[0]?.payload?.fullName || label}</p>
        {payload.map((entry, index) => {
          const house = houses.find(h => h.key === entry.dataKey);
          return (
            <div key={index} className="flex items-center mb-1 last:mb-0">
              <div 
                className="w-2 h-2 rounded-full mr-1.5" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-dark-200">{house ? house.name : entry.dataKey}:</span>
              <span className="text-white ml-1 font-medium">
                {entry.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
});

// Set display name for memoized component
CustomTooltip.displayName = 'CustomTooltip';

// Custom pie chart label component that's responsive to screen size
const PieChartLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, index }) => {
  // Calculate the position of the label
  const RADIAN = Math.PI / 180;
  // Increase this value to move labels further from center (75%-85% of outer radius is good)
  const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Use window.innerWidth to check viewport width
  // Only render labels on larger screens
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
  
  if (isSmallScreen) {
    // Don't render text labels on small screens
    return null;
  }
  
  return (
    <text 
      x={x} 
      y={y} 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fill="#fff"
      fontSize={10}
      fontWeight="bold"
    >
      {`${name.substring(0, 6)}${name.length > 6 ? '..' : ''} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const ScoreboardStats = ({ houses, scores }) => {
  // State to track chart data
  const [cumulativeData, setCumulativeData] = useState([]);
  const [eventComparisonData, setEventComparisonData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [housePerformanceData, setHousePerformanceData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Memoize the chart theme to prevent infinite re-renders
  const chartTheme = useMemo(() => getChartTheme(houses), [houses]);
  
  // Memoize gradient definitions
  const gradientDefs = useMemo(() => {
    return chartTheme.getGradientDefinitions();
  }, [chartTheme]);
  
  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Process data for charts
  useEffect(() => {
    // Calculate cumulative data for line chart
    const eventScores = scores.filter(score => score.type !== 'total');
    const cumulativePoints = {};
    
    // Initialize cumulative points for each house
    houses.forEach(house => {
      cumulativePoints[house.key] = 0;
    });
    
    const cumulativeChartData = eventScores.map(event => {
      const dataPoint = {
        name: event.eventName.length > 10 ? event.eventName.substring(0, 10) + '...' : event.eventName,
        fullName: event.eventName,
        date: event.date,
      };
      
      // Add points for each house
      houses.forEach(house => {
        const points = event.points[house.key] || 0;
        cumulativePoints[house.key] += points;
        dataPoint[house.key] = cumulativePoints[house.key];
      });
      
      return dataPoint;
    });
    
    setCumulativeData(cumulativeChartData);
    
    // Prepare event comparison data for bar chart
    const barChartData = eventScores.map(event => {
      const dataPoint = {
        name: event.eventName.length > 8 ? event.eventName.substring(0, 8) + '...' : event.eventName,
        fullName: event.eventName,
        date: event.date,
      };
      
      // Add points for each house
      houses.forEach(house => {
        dataPoint[house.key] = event.points[house.key] || 0;
      });
      
      return dataPoint;
    });
    
    setEventComparisonData(barChartData);
    
    // Prepare distribution data for pie chart
    const totalScoreEvent = scores.find(score => score.type === 'total');
    
    if (totalScoreEvent) {
      const pieData = houses.map(house => ({
        name: house.name,
        value: totalScoreEvent.points[house.key] || 0,
        color: chartTheme.getChartColor(house.key),
        key: house.key
      }));
      
      setDistributionData(pieData);
      
      // Calculate house performance metrics
      const performanceData = houses.map(house => {
        // Get all points for this house (excluding total)
        const housePoints = eventScores.map(event => ({
          event: event.eventName,
          points: event.points[house.key] || 0
        }));
        
        // Count wins (highest points in an event)
        const wins = eventScores.filter(event => {
          const housePoint = event.points[house.key] || 0;
          const maxPoints = Math.max(...Object.values(event.points).filter(p => !isNaN(p)));
          return housePoint === maxPoints && housePoint > 0;
        }).length;
        
        // Calculate average points per event
        const totalPoints = housePoints.reduce((sum, event) => sum + event.points, 0);
        const avgPoints = housePoints.length > 0 ? totalPoints / housePoints.length : 0;
        
        return {
          name: house.name,
          key: house.key,
          totalPoints: totalScoreEvent.points[house.key] || 0,
          wins,
          avgPoints: parseFloat(avgPoints.toFixed(1)),
          color: chartTheme.getChartColor(house.key)
        };
      });
      
      setHousePerformanceData(performanceData);
    }
  }, [houses, scores, chartTheme]);
  
  // Render the gradient definitions
  const renderGradients = () => {
    return (
      <defs>
        {gradientDefs.map(gradient => (
          <linearGradient 
            key={gradient.id} 
            id={gradient.id} 
            x1="0" 
            y1="0" 
            x2="0" 
            y2="1"
          >
            {gradient.stops.map((stop, index) => (
              <stop 
                key={index}
                offset={stop.offset}
                stopColor={stop.color}
                stopOpacity={stop.opacity}
              />
            ))}
          </linearGradient>
        ))}
      </defs>
    );
  };

  // Recharts common configuration
  const chartConfig = {
    xAxisConfig: {
      tick: { fill: '#a1a3ac', fontSize: 10 },
      axisLine: { stroke: '#404149' },
      angle: -45,
      textAnchor: "end",
      height: 60,
      padding: { left: 0, right: 0 }
    },
    yAxisConfig: {
      tick: { fill: '#a1a3ac', fontSize: 10 },
      axisLine: { stroke: '#404149' },
      tickMargin: 5
    },
    gridConfig: {
      strokeDasharray: "3 3",
      stroke: "#2a2a2a"
    },
    legendConfig: {
      wrapperStyle: { paddingTop: 15, fontSize: 12 },
      iconSize: 8,
      iconType: "circle"
    }
  };

  // Determine pie chart settings based on screen size
  const getPieChartSettings = () => {
    // Responsive values for the pie chart
    if (windowWidth < 640) { // Small screens (phones)
      return {
        outerRadius: 70,
        innerRadius: 35,
        // No labels for small screens, use tooltip only
        label: false,
        labelLine: false
      };
    } else { // Larger screens
      return {
        outerRadius: 90,
        innerRadius: 40,
        label: props => <PieChartLabel {...props} />,
        labelLine: false
      };
    }
  };

  const pieSettings = getPieChartSettings();

  return (
    <div className="space-y-4 mb-8 md:mb-12">
      {/* Cumulative Performance Line/Area Chart */}
      <ChartContainer title="Cumulative Performance">
        <AreaChart
          data={cumulativeData}
          margin={{ top: 10, right: 10, left: -10, bottom: 30 }}
        >
          {renderGradients()}
          <CartesianGrid {...chartConfig.gridConfig} />
          <XAxis dataKey="name" {...chartConfig.xAxisConfig} />
          <YAxis {...chartConfig.yAxisConfig} />
          <Tooltip content={<CustomTooltip houses={houses} />} />
          <Legend {...chartConfig.legendConfig} />
          
          {houses.map(house => (
            <Area
              key={house.key}
              type="monotone"
              dataKey={house.key}
              name={house.name}
              stroke={chartTheme.getChartColor(house.key)}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${chartTheme.getGradientId(house.key)})`}
              activeDot={{ r: 4, stroke: chartTheme.getChartColor(house.key), strokeWidth: 2, fill: "#fff" }}
            />
          ))}
        </AreaChart>
      </ChartContainer>
      
      {/* Event Comparison Bar Chart */}
      <ChartContainer title="Points by Event" delay={0.1}>
        <BarChart
          data={eventComparisonData}
          margin={{ top: 10, right: 10, left: -10, bottom: 30 }}
          barGap={2}
          barSize={12}
        >
          <CartesianGrid {...chartConfig.gridConfig} vertical={false} />
          <XAxis 
            dataKey="name" 
            {...chartConfig.xAxisConfig}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis {...chartConfig.yAxisConfig} />
          <Tooltip content={<CustomTooltip houses={houses} />} />
          <Legend {...chartConfig.legendConfig} />
          
          {houses.map(house => (
            <Bar
              key={house.key}
              dataKey={house.key}
              name={house.name}
              fill={chartTheme.getChartColor(house.key)}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </BarChart>
      </ChartContainer>
      
      {/* Two-column layout for remaining charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        {/* Points Distribution Pie Chart */}
        <ChartContainer title="Points Distribution" delay={0.2}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              outerRadius={pieSettings.outerRadius}
              innerRadius={pieSettings.innerRadius}
              paddingAngle={2}
              dataKey="value"
              label={pieSettings.label}
              labelLine={pieSettings.labelLine}
              strokeWidth={1}
              stroke="#121214"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip houses={houses} />}
              formatter={(value, name, props) => {
                return [`${value}p`, houses.find(h => h.key === props.key)?.name];
              }} 
            />
          </PieChart>
        </ChartContainer>
        
        {/* House Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-4 sm:p-5 md:p-6 rounded-xl shadow-lg border border-dark-800/50"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
            House Performance
            <div className="ml-auto h-1 flex-grow max-w-12 sm:max-w-16 bg-brand-500/50 rounded-full"></div>
          </h3>
          
          <div className="space-y-3 sm:space-y-4 max-h-[280px] sm:max-h-[320px] md:max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
            {housePerformanceData.map(house => (
              <div 
                key={house.key}
                className="bg-dark-800 rounded-lg p-3 sm:p-4 border-l-4"
                style={{ borderLeftColor: house.color }}
              >
                <div className="flex items-center mb-2 sm:mb-3">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-dark-900 p-1 flex items-center justify-center mr-3"
                  >
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                      style={{ backgroundColor: house.color }}
                    ></div>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">{house.name}</h4>
                </div>
                
                <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                  <div className="bg-dark-900/50 rounded-lg p-1.5 sm:p-2">
                    <div className="text-base sm:text-xl font-bold" style={{ color: house.color }}>{house.totalPoints}</div>
                    <div className="text-xs text-dark-300">Total Points</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-1.5 sm:p-2">
                    <div className="text-base sm:text-xl font-bold" style={{ color: house.color }}>{house.wins}</div>
                    <div className="text-xs text-dark-300">Event Wins</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-1.5 sm:p-2">
                    <div className="text-base sm:text-xl font-bold" style={{ color: house.color }}>{house.avgPoints}</div>
                    <div className="text-xs text-dark-300">Avg. Points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(ScoreboardStats);