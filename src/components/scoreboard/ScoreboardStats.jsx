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
    className="glass-card p-6 rounded-xl shadow-lg border border-dark-800/50 overflow-hidden mb-8 last:mb-0"
  >
    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
      {title}
      <div className="ml-auto h-1 flex-grow max-w-16 bg-brand-500/50 rounded-full"></div>
    </h3>
    
    <div className="h-[350px] w-full">
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
        name: event.eventName.length > 15 ? event.eventName.substring(0, 15) + '...' : event.eventName,
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
        name: event.eventName.length > 10 ? event.eventName.substring(0, 10) + '...' : event.eventName,
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
        <div className="bg-dark-900 p-4 rounded-lg shadow-lg border border-dark-700">
          <p className="text-white font-bold mb-2">{payload[0]?.payload?.fullName || label}</p>
          {payload.map((entry, index) => {
            const house = houses.find(h => h.key === entry.dataKey);
            return (
              <div key={index} className="flex items-center mb-1.5 last:mb-0">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-dark-200 text-sm">{house ? house.name : entry.dataKey}:</span>
                <span className="text-white text-sm ml-1 font-medium">
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
    <div className="space-y-4 mb-12">
      {/* Cumulative Performance Line/Area Chart */}
      <ChartContainer title="Cumulative Performance">
        <AreaChart
          data={cumulativeData}
          margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
        >
          {renderGradients()}
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#a1a3ac' }} 
            axisLine={{ stroke: '#404149' }}
            angle={-45}
            textAnchor="end"
            height={70}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis 
            tick={{ fill: '#a1a3ac' }} 
            axisLine={{ stroke: '#404149' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 15 }}
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
              activeDot={{ r: 6, stroke: chartTheme.getChartColor(house.key), strokeWidth: 2, fill: "#fff" }}
            />
          ))}
        </AreaChart>
      </ChartContainer>
      
      {/* Event Comparison Bar Chart */}
      <ChartContainer title="Points by Event" delay={0.1}>
        <BarChart
          data={eventComparisonData}
          margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          barGap={2}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#a1a3ac' }} 
            axisLine={{ stroke: '#404149' }}
            angle={-45}
            textAnchor="end"
            height={70}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis 
            tick={{ fill: '#a1a3ac' }} 
            axisLine={{ stroke: '#404149' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: 15 }}
          />
          
          {houses.map(house => (
            <Bar
              key={house.key}
              dataKey={house.key}
              name={house.name}
              fill={chartTheme.getChartColor(house.key)}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ChartContainer>
      
      {/* Two-column layout for remaining charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Points Distribution Pie Chart */}
        <ChartContainer title="Points Distribution" delay={0.2}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              innerRadius={60}
              paddingAngle={2}
              dataKey="value"
              label={({ name, value, percent }) => `${name} (${value}p, ${(percent * 100).toFixed(0)}%)`}
              strokeWidth={1}
              stroke="#121214"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartContainer>
        
        {/* House Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 rounded-xl shadow-lg border border-dark-800/50"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            House Performance
            <div className="ml-auto h-1 flex-grow max-w-16 bg-brand-500/50 rounded-full"></div>
          </h3>
          
          <div className="space-y-4">
            {housePerformanceData.map(house => (
              <div 
                key={house.key}
                className="bg-dark-800 rounded-lg p-4 border-l-4"
                style={{ borderLeftColor: house.color }}
              >
                <div className="flex items-center mb-3">
                  <div 
                    className="w-10 h-10 rounded-full bg-dark-900 p-1 flex items-center justify-center mr-3"
                  >
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: house.color }}
                    ></div>
                  </div>
                  <h4 className="text-lg font-bold text-white">{house.name}</h4>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-dark-900/50 rounded-lg p-2">
                    <div className="text-xl font-bold" style={{ color: house.color }}>{house.totalPoints}</div>
                    <div className="text-xs text-dark-300">Total Points</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-2">
                    <div className="text-xl font-bold" style={{ color: house.color }}>{house.wins}</div>
                    <div className="text-xs text-dark-300">Event Wins</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-2">
                    <div className="text-xl font-bold" style={{ color: house.color }}>{house.avgPoints}</div>
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