import React, { useState, useEffect, useMemo } from 'react';
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
const ChartContainer = ({ title, children, delay = 0 }) => (
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
);

const ScoreboardStats = ({ houses, scores }) => {
  // State to track chart data
  const [cumulativeData, setCumulativeData] = useState([]);
  const [eventComparisonData, setEventComparisonData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [housePerformanceData, setHousePerformanceData] = useState([]);
  
  // Memoize the chart theme to prevent infinite re-renders
  const chartTheme = useMemo(() => getChartTheme(houses), [houses]);
  
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
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
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
  };

  // Render the gradient definitions
  const renderGradients = () => {
    const gradientDefs = chartTheme.getGradientDefinitions();
    
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

  return (
    <div className="space-y-4 mb-8 md:mb-12">
      {/* Cumulative Performance Line/Area Chart */}
      <ChartContainer title="Cumulative Performance">
        <AreaChart
          data={cumulativeData}
          margin={{ top: 10, right: 10, left: -10, bottom: 30 }}
        >
          {renderGradients()}
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#a1a3ac', fontSize: 10 }} 
            axisLine={{ stroke: '#404149' }}
            angle={-45}
            textAnchor="end"
            height={60}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis 
            tick={{ fill: '#a1a3ac', fontSize: 10 }} 
            axisLine={{ stroke: '#404149' }}
            tickMargin={5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 15, fontSize: 12 }}
            iconSize={8}
            iconType="circle"
          />
          
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
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#a1a3ac', fontSize: 10 }} 
            axisLine={{ stroke: '#404149' }}
            angle={-45}
            textAnchor="end"
            height={60}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis 
            tick={{ fill: '#a1a3ac', fontSize: 10 }} 
            axisLine={{ stroke: '#404149' }}
            tickMargin={5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: 15, fontSize: 12 }}
            iconSize={8}
            iconType="circle"
          />
          
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
              labelLine={false}
              outerRadius={90}
              innerRadius={40}
              paddingAngle={2}
              dataKey="value"
              label={({ name, value, percent }) => (
                `${name.substring(0, 8)}${name.length > 8 ? '..' : ''} (${(percent * 100).toFixed(0)}%)`
              )}
              strokeWidth={1}
              stroke="#121214"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
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

export default ScoreboardStats;