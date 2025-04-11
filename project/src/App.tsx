import React, { useState } from 'react';
import { Search, Calendar, ExternalLink, ChevronDown, Filter, Star, Trash2, Newspaper } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface NewsItem {
  title: string;
  source: string;
  summary: string;
  url: string;
  sentiment: {
    score: number;
    type: 'positive' | 'negative' | 'neutral';
  };
  date: string;
}

interface NewsSource {
  name: string;
  checked: boolean;
}

function App() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortOption, setSortOption] = useState<string>('date-desc');
  const [favoriteKeywords, setFavoriteKeywords] = useState<string[]>([]);
  const [sources, setSources] = useState<NewsSource[]>([
    { name: 'climatereport.org', checked: true },
    { name: 'techeconomy.com', checked: true },
    { name: 'quantumtech.org', checked: true },
    { name: 'greentech.com', checked: true },
    { name: 'spacenews.com', checked: true },
  ]);

  const mockNews: NewsItem[] = [
    {
      title: "Global Climate Change Report 2025",
      source: "techeconomy.com",
      summary: "New research indicates significant changes in global temperature patterns...",
      url: "https://example.com/article2",
      sentiment: { score: 65, type: 'neutral' },
      date: "2025-03-15"
    },
    {
      title: "Economic Trends in Tech Industry",
      source: "techeconomy.com",
      summary: "Latest analysis shows emerging patterns in technology sector investments...",
      url: "https://example.com/article3",
      sentiment: { score: 88, type: 'positive' },
      date: "2025-04-01"
    },
    {
      title: "Breakthrough in Quantum Computing",
      source: "climatereport.org",
      summary: "Scientists announce major advancement in quantum computing stability...",
      url: "https://example.com/article4",
      sentiment: { score: 35, type: 'negative' },
      date: "2025-04-08"
    },
    {
      title: "Sustainable Energy Solutions",
      source: "greentech.com",
      summary: "Innovative renewable energy technologies are reshaping the power generation...",
      url: "https://example.com/article5",
      sentiment: { score: 78, type: 'positive' },
      date: "2025-03-25"
    },
    {
      title: "Advancements in Space Exploration",
      source: "techeconomy.com",
      summary: "Recent missions reveal groundbreaking discoveries about distant planets...",
      url: "https://example.com/article6",
      sentiment: { score: 52, type: 'neutral' },
      date: "2025-04-03"
    },
    {
      title: "Global Climate Change Report 2025",
      source: "spacenews.com",
      summary: "New research indicates significant changes in global temperature patterns...",
      url: "https://example.com/article2",
      sentiment: { score: 50, type: 'neutral' },
      date: "2025-04-20"
    },
    {
      title: "Economic Trends in Tech Industry",
      source: "quantumtech.org",
      summary: "Latest analysis shows emerging patterns in technology sector investments...",
      url: "https://example.com/article3",
      sentiment: { score: 95, type: 'positive' },
      date: "2025-04-10"
    },
    {
      title: "Breakthrough in Quantum Computing",
      source: "climatereport.org",
      summary: "Scientists announce major advancement in quantum computing stability...",
      url: "https://example.com/article4",
      sentiment: { score: 25, type: 'negative' },
      date: "2025-04-01"
    },
    {
      title: "Sustainable Energy Solutions",
      source: "greentech.com",
      summary: "Innovative renewable energy technologies are reshaping the power generation...",
      url: "https://example.com/article5",
      sentiment: { score: 90, type: 'positive' },
      date: "2025-04-07"
    },
    {
      title: "Advancements in Space Exploration",
      source: "spacenews.com",
      summary: "Recent missions reveal groundbreaking discoveries about distant planets...",
      url: "https://example.com/article6",
      sentiment: { score: 75, type: 'positive' },
      date: "2025-03-09"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', keyword, 'between', startDate, 'and', endDate);
    console.log('Selected sources:', sources.filter(s => s.checked).map(s => s.name));
  };

  const toggleSource = (sourceName: string) => {
    setSources(sources.map(source =>
        source.name === sourceName
            ? { ...source, checked: !source.checked }
            : source
    ));
  };

  const toggleFavoriteKeyword = () => {
    if (!keyword.trim()) return;
    if (favoriteKeywords.includes(keyword)) {
      setFavoriteKeywords(favoriteKeywords.filter(kw => kw !== keyword));
    } else {
      setFavoriteKeywords([...favoriteKeywords, keyword]);
    }
  };

  const removeFavoriteKeyword = (kw: string) => {
    setFavoriteKeywords(favoriteKeywords.filter(fav => fav !== kw));
  };

  const selectFavoriteKeyword = (kw: string) => {
    setKeyword(kw);
    console.log('Selected favorite keyword:', kw);
  };

  const filteredNews = mockNews.filter(news =>
      sources.find(source => source.name === news.source)?.checked
  );

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortOption) {
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'source-asc':
        return a.source.localeCompare(b.source);
      case 'source-desc':
        return b.source.localeCompare(a.source);
      default:
        return 0;
    }
  });

  const getSentimentStyle = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentEmoji = (type: string) => {
    switch (type) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😟';
      case 'neutral':
        return '😐';
      default:
        return '😐';
    }
  };

  const handleSourceClick = (news: NewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNews(news);
  };

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const sentimentData = (() => {
    const groupedByDate = filteredNews.reduce((acc, news) => {
      if (!acc[news.date]) {
        acc[news.date] = [];
      }
      acc[news.date].push(news.sentiment.score);
      return acc;
    }, {} as { [key: string]: number[] });

    const averagedData = Object.keys(groupedByDate).map(date => ({
      date,
      timestamp: new Date(date).getTime(),
      sentiment: groupedByDate[date].reduce((sum, score) => sum + score, 0) / groupedByDate[date].length,
    }));

    return averagedData.sort((a, b) => a.timestamp - b.timestamp);
  })();

  const formatXAxis = (tick: number) => {
    return new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const sentimentDistribution = [
    {
      name: 'Positive',
      value: filteredNews.filter(n => n.sentiment.type === 'positive').length,
      fill: '#10B981',
    },
    {
      name: 'Negative',
      value: filteredNews.filter(n => n.sentiment.type === 'negative').length,
      fill: '#EF4444',
    },
    {
      name: 'Neutral',
      value: filteredNews.filter(n => n.sentiment.type === 'neutral').length,
      fill: '#FBBF24',
    },
  ];

  const sourceSentimentDistribution = sources
      .map(source => {
        const newsForSource = filteredNews.filter(news => news.source === source.name);
        return {
          source: source.name,
          Positive: newsForSource.filter(n => n.sentiment.type === 'positive').length,
          Negative: newsForSource.filter(n => n.sentiment.type === 'negative').length,
          Neutral: newsForSource.filter(n => n.sentiment.type === 'neutral').length,
        };
      })
      .filter(item => item.Positive > 0 || item.Negative > 0 || item.Neutral > 0);

  return (
      <div className="min-h-screen flex flex-col bg-[#F7F7F9]">
        <header className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <Newspaper size={28} className="text-white animate-pulse" />
            <h1 className="text-2xl font-bold animate-slide-in hover:text-yellow-300 hover:scale-105 transition-all duration-300">
              News Insight Web
            </h1>
          </div>
        </header>

        <div className="max-w-7xl mx-auto w-full px-6 mt-8">
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 pb-2">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter keyword..."
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    <button
                        type="button"
                        onClick={toggleFavoriteKeyword}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                    >
                      <Star
                          size={20}
                          className={favoriteKeywords.includes(keyword) ? 'fill-yellow-500 text-yellow-500' : ''}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                        type="date"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
                  </div>
                  <div className="relative">
                    <input
                        type="date"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
                  </div>
                  <button
                      type="submit"
                      className="bg-[#1E3A8A] text-white px-6 py-2 rounded-lg hover:bg-[#60A5FA] transition-colors duration-200"
                  >
                    Search
                  </button>
                </div>
              </div>

              <button
                  type="button"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="flex items-center gap-1 text-[#1E3A8A] hover:text-[#60A5FA] transition-colors duration-200 text-sm mt-1"
              >
                More Options
                <ChevronDown
                    size={14}
                    className={`transform transition-transform duration-200 ${showMoreOptions ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <div
                className={`
              border-t border-gray-200 bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out
              ${showMoreOptions ? 'max-h-72 py-4' : 'max-h-0'}
            `}
            >
              <div className="px-6">
                <h3 className="font-semibold text-gray-700 mb-3">Select News Sources</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {sources.map((source) => (
                      <label key={source.name} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={source.checked}
                            onChange={() => toggleSource(source.name)}
                            className="rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                        />
                        <span className="text-gray-700">{source.name}</span>
                      </label>
                  ))}
                </div>
              </div>
            </div>
          </form>

          {favoriteKeywords.length > 0 && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold text-[#111827] mb-2">Favorite keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {favoriteKeywords.map((kw, index) => (
                      <div
                          key={index}
                          className="flex items-center gap-1 bg-[#E5E7EB] rounded-full px-2 py-0.5 text-s text-gray-700 border border-gray-300"
                      >
                        <button
                            onClick={() => selectFavoriteKeyword(kw)}
                            className="hover:text-[#1E3A8A] transition-colors duration-200"
                        >
                          {kw}
                        </button>
                        <button
                            onClick={() => removeFavoriteKeyword(kw)}
                            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#111827] mb-4">Sentiment Analysis Overview</h2>
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex flex-row gap-4 overflow-x-auto items-start">
                <div className="flex-1 min-w-[450px]">
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">Sentiment Trend</h3>
                  <LineChart width={400} height={250} data={sentimentData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={formatXAxis}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        label={{ value: "Sentiment Score", angle: -90, position: 'insideLeft', fontSize: 12 }}
                        domain={[0, 100]}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                        formatter={(value: number) => `${value.toFixed(2)}%`}
                        labelFormatter={(label: number) => new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="sentiment" stroke="#1E3A8A" activeDot={{ r: 4 }} strokeWidth={1} />
                  </LineChart>
                </div>

                <div className="flex-1 min-w-[250px]">
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">Sentiment Distribution</h3>
                  <PieChart width={250} height={200}>
                    <Pie
                        data={sentimentDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                        isAnimationActive={false}
                        activeIndex={-1}
                        stroke="none"
                    >
                      {sentimentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </PieChart>
                </div>

                <div className="flex-1 min-w-[450px]">
                  <h3 className="text-lg font-semibold text-[#111827] mb-1">Source Distribution</h3>
                  <BarChart width={400} height={250} data={sourceSentimentDistribution} margin={{ top: 5, right: 10, left: 0, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" angle={-45} textAnchor="end" height={50} interval={0} tick={{ fontSize: 12 }} />
                    <YAxis
                        label={{ value: "Number of News", angle: -90, position: 'bottomLeft', fontSize: 12, dx: -20 }}
                        tick={{ fontSize: 12 }}
                        ticks={Array.from({ length: Math.max(...filteredNews.map(news => filteredNews.filter(n => n.source === news.source).length)) }, (_, i) => i)}
                        domain={[0, 'dataMax']}
                    />
                    <Tooltip />
                    <Bar dataKey="Positive" stackId="a" fill="#10B981" />
                    <Bar dataKey="Negative" stackId="a" fill="#EF4444" />
                    <Bar dataKey="Neutral" stackId="a" fill="#FBBF24" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-7xl mx-auto w-full px-6 mb-16">
          <div className="grid grid-cols-2 gap-6">
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#111827]">News List</h2>
                <div className="relative">
                  <button
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                      className="flex items-center gap-1 text-[#1E3A8A] hover:text-[#60A5FA] transition-colors duration-200 text-sm"
                  >
                    <Filter size={16} />
                    Filter
                  </button>
                  {showFilterMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                        <div className="py-1">
                          <button
                              onClick={() => {
                                setSortOption('date-asc');
                                setShowFilterMenu(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Date (Ascending)
                          </button>
                          <button
                              onClick={() => {
                                setSortOption('date-desc');
                                setShowFilterMenu(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Date (Descending)
                          </button>
                          <button
                              onClick={() => {
                                setSortOption('source-asc');
                                setShowFilterMenu(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Source (A-Z)
                          </button>
                          <button
                              onClick={() => {
                                setSortOption('source-desc');
                                setShowFilterMenu(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Source (Z-A)
                          </button>
                        </div>
                      </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {sortedNews.map((news, index) => (
                    <div
                        key={index}
                        onClick={() => handleNewsClick(news)}
                        className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 relative"
                    >
                  <span
                      className={`absolute top-2 right-2 inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium ${getSentimentStyle(news.sentiment.type)}`}
                  >
                    <span className="text-lg">{getSentimentEmoji(news.sentiment.type)}</span>
                    <span>{news.sentiment.score}%</span>
                  </span>
                      <h2 className="text-lg font-semibold text-[#111827] pr-16">{news.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{news.date} •</span>
                        <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleSourceClick(news, e)}
                            className="text-sm text-[#1E3A8A] hover:underline flex items-center gap-1"
                        >
                          {news.source} <ExternalLink size={14} />
                        </a>
                      </div>
                      <p className="text-[#6B7280] mt-2 text-sm line-clamp-3">{news.summary}</p>
                    </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="sticky top-[72px]">
                <div className="bg-white rounded-lg shadow-md p-6 max-h-[calc(100vh-72px-32px)] overflow-y-auto mt-8 relative">
                  {selectedNews ? (
                      <div className="h-full">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-[#111827]">Source: {selectedNews.source}</h3>
                        </div>
                        <iframe
                            src={selectedNews.url}
                            title={selectedNews.title}
                            className="w-full h-[calc(100vh-72px-32px-72px)] border-0"
                        />
                      </div>
                  ) : (
                      <div className="text-center text-[#6B7280]">
                        Select a news article to view its source
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-[#1E3A8A] text-white py-3">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm">
            © 2025 News Insight Web. All rights reserved.
          </div>
        </footer>
      </div>
  );
}

export default App;