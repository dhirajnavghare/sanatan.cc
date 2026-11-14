'use client';

import { useState, useMemo } from 'react';
import { PanchangData } from '@/app/lib/panchang/types';
import {
  buildDayPlannerSlots,
  addTodoToSlot,
  toggleTodoItem,
  deleteTodoItem,
  DayPlansMap,
  TodoItem,
} from '@/app/lib/services/dayplanner';
import { triggerHaptic } from '@/app/lib/services/sacredAudio';

interface DayPlannerSectionProps {
  panchang: PanchangData;
  dateKey: string;
  dayPlans: DayPlansMap;
  onPlansChange: (updated: DayPlansMap) => void;
  timezone: string;
  isHi: boolean;
}

export default function DayPlannerSection({
  panchang,
  dateKey,
  dayPlans,
  onPlansChange,
  timezone,
  isHi,
}: DayPlannerSectionProps) {
  const [plannerFilter, setPlannerFilter] = useState<'core' | 'all' | 'planned'>('core');
  const [editingInputs, setEditingInputs] = useState<Record<string, string>>({});

  const formatTime = (d: Date | string | null): string => {
    if (!d) return '—';
    const dateObj = typeof d === 'string' ? new Date(d) : d;
    try {
      return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone,
      }).format(dateObj);
    } catch {
      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const plannerSlots = useMemo(() => {
    return buildDayPlannerSlots(panchang, new Date());
  }, [panchang]);

  const totalPlannedCount = useMemo(() => {
    return Object.values(dayPlans).reduce((acc, plan) => {
      const count = plan.todos && plan.todos.length > 0 ? plan.todos.length : plan.taskText ? 1 : 0;
      return acc + count;
    }, 0);
  }, [dayPlans]);

  const totalCompletedCount = useMemo(() => {
    return Object.values(dayPlans).reduce((acc, plan) => {
      if (plan.todos && plan.todos.length > 0) {
        return acc + plan.todos.filter((t) => t.isCompleted).length;
      }
      return acc + (plan.taskText && plan.isCompleted ? 1 : 0);
    }, 0);
  }, [dayPlans]);

  const filteredSlots = useMemo(() => {
    if (plannerFilter === 'core') {
      return plannerSlots.filter((s) => {
        const plan = dayPlans[s.id];
        const hasTasks = (plan?.todos && plan.todos.length > 0) || Boolean(plan?.taskText);
        return s.isCore || hasTasks;
      });
    }
    if (plannerFilter === 'planned') {
      return plannerSlots.filter((s) => {
        const plan = dayPlans[s.id];
        return (plan?.todos && plan.todos.length > 0) || Boolean(plan?.taskText);
      });
    }
    return plannerSlots;
  }, [plannerSlots, plannerFilter, dayPlans]);

  const handleInputChange = (slotId: string, val: string) => {
    setEditingInputs((prev) => ({ ...prev, [slotId]: val }));
  };

  const handleAddTodo = async (slotId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    await triggerHaptic('tap');
    const updated = await addTodoToSlot(dateKey, slotId, trimmed);
    onPlansChange(updated);
    setEditingInputs((prev) => ({ ...prev, [slotId]: '' }));
  };

  const handleApplySuggestion = async (slotId: string, suggestion: string) => {
    await triggerHaptic('tap');
    const updated = await addTodoToSlot(dateKey, slotId, suggestion);
    onPlansChange(updated);
  };

  const handleToggleTodo = async (slotId: string, todoId: string) => {
    await triggerHaptic('tap');
    const updated = await toggleTodoItem(dateKey, slotId, todoId);
    onPlansChange(updated);
  };

  const handleDeleteTodo = async (slotId: string, todoId: string) => {
    await triggerHaptic('tap');
    const updated = await deleteTodoItem(dateKey, slotId, todoId);
    onPlansChange(updated);
  };

  return (
    <div
      data-testid="planner-section"
      className="space-y-4 rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🗓️</span>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
              {isHi ? 'आज की दिन योजना (Day Planner)' : 'Hindu Day Planner'}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi
              ? 'शास्त्रसम्मत शुभ काल के अनुसार अपने कार्यों का नियोजन करें'
              : 'Schedule tasks aligned with auspicious cosmic timings'}
          </p>
        </div>

        {totalPlannedCount > 0 && (
          <span className="self-start sm:self-auto rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
            🎯 {totalCompletedCount}/{totalPlannedCount} {isHi ? 'सम्पन्न' : 'Done'}
          </span>
        )}
      </div>

      {/* Filter Tabs: Core vs All 24h vs Planned */}
      <div className="flex items-center gap-1.5 border-b border-zinc-100 pb-3 dark:border-zinc-800">
        <button
          type="button"
          data-testid="planner-tab-core"
          onClick={() => {
            triggerHaptic('tap');
            setPlannerFilter('core');
          }}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
            plannerFilter === 'core'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {isHi ? '🌟 मुख्य मुहूर्त' : '🌟 Core Windows'}
        </button>

        <button
          type="button"
          data-testid="planner-tab-all"
          onClick={() => {
            triggerHaptic('tap');
            setPlannerFilter('all');
          }}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
            plannerFilter === 'all'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {isHi ? '🕒 24h सम्पूर्ण' : '🕒 All 24h'}
        </button>

        <button
          type="button"
          data-testid="planner-tab-planned"
          onClick={() => {
            triggerHaptic('tap');
            setPlannerFilter('planned');
          }}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
            plannerFilter === 'planned'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {isHi ? `✍️ नियोजित (${totalPlannedCount})` : `✍️ Planned (${totalPlannedCount})`}
        </button>
      </div>

      {/* Slots List */}
      <div className="space-y-3">
        {filteredSlots.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-serif text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {isHi ? 'कोई कार्य नियोजित नहीं है' : 'No tasks planned yet'}
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              {isHi
                ? 'ऊपर "मुख्य मुहूर्त" टैब पर जाएँ और अपने कार्यों को शुभ समय अनुसार जोड़ें।'
                : 'Switch to "Core Windows" above to plan tasks during auspicious hours.'}
            </p>
          </div>
        ) : (
          filteredSlots.map((slot) => {
            const plan = dayPlans[slot.id];
            const todos: TodoItem[] =
              plan?.todos && plan.todos.length > 0
                ? plan.todos
                : plan?.taskText
                ? [{ id: 'legacy', text: plan.taskText, isCompleted: Boolean(plan.isCompleted), createdAt: plan.updatedAt || 0 }]
                : [];

            const doneCount = todos.filter((t) => t.isCompleted).length;
            const isAllDone = todos.length > 0 && doneCount === todos.length;
            const isAshubh = slot.quality === 'Ashubh';
            const isMahashubh = slot.quality === 'Mahashubh' || slot.quality === 'Amrit';
            const inputValue = editingInputs[slot.id] || '';

            return (
              <div
                key={slot.id}
                className={`rounded-2xl border p-4 transition ${
                  slot.isCurrent
                    ? 'border-amber-400/80 bg-amber-50/20 shadow-xs dark:bg-amber-950/15'
                    : isAshubh
                    ? 'border-red-200/80 bg-red-50/20 dark:border-red-900/40 dark:bg-red-950/10'
                    : isAllDone
                    ? 'border-emerald-200/80 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-emerald-950/10'
                    : 'border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-950/50'
                }`}
              >
                {/* Top Row: Time Range, Title, Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </span>
                    <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {isHi ? slot.titleHi : slot.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {slot.isCurrent && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 animate-pulse">
                        ● {isHi ? 'सक्रिय' : 'LIVE'}
                      </span>
                    )}

                    {todos.length > 0 && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isAllDone
                            ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                            : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        {isAllDone ? (isHi ? '✓ पूर्ण' : '✓ Done') : `🎯 ${doneCount}/${todos.length}`}
                      </span>
                    )}

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isAshubh
                          ? 'bg-red-500/20 text-red-800 dark:text-red-300'
                          : isMahashubh
                          ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      {isAshubh
                        ? isHi ? 'त्याज्य' : 'Avoid'
                        : isMahashubh
                        ? isHi ? 'महाशुभ' : 'Supreme'
                        : isHi ? 'शुभ' : 'Shubh'}
                    </span>
                  </div>
                </div>

                {/* Suitability Guidance */}
                <div
                  className={`mt-2.5 rounded-xl p-2.5 text-xs ${
                    isAshubh
                      ? 'bg-red-500/10 text-red-900 dark:bg-red-950/30 dark:text-red-300'
                      : 'bg-white p-2.5 text-zinc-700 shadow-2xs dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  <span className="font-bold">
                    {isAshubh
                      ? isHi ? '⚠️ इस समय क्या न करें: ' : '⚠️ What to avoid now: '
                      : isHi ? '💡 यह समय किस कार्य के लिए है: ' : '💡 What this time is for: '}
                  </span>
                  <span>{isHi ? slot.suitabilityHi : slot.suitability}</span>
                </div>

                {/* Quick Chips (Tap to add to To-Do list) */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {(isHi ? slot.suggestedTasksHi : slot.suggestedTasks).map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => handleApplySuggestion(slot.id, suggestion)}
                      className="rounded-lg border border-amber-300/80 bg-amber-50/60 px-2.5 py-1 text-[11px] font-medium text-amber-900 transition hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300 cursor-pointer"
                    >
                      + {suggestion}
                    </button>
                  ))}
                </div>

                {/* To-Do Checklist Items */}
                {todos.length > 0 && (
                  <div className="mt-3 space-y-1.5 border-t border-zinc-200/60 pt-2.5 dark:border-zinc-800">
                    {todos.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center justify-between gap-2 rounded-xl bg-white p-2 text-xs shadow-2xs dark:bg-zinc-800"
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleTodo(slot.id, todo.id)}
                          className="flex items-center gap-2 text-left flex-1 cursor-pointer"
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                              todo.isCompleted
                                ? 'border-emerald-500 bg-emerald-500 text-white'
                                : 'border-zinc-300 dark:border-zinc-600'
                            }`}
                          >
                            {todo.isCompleted ? '✓' : ''}
                          </span>
                          <span
                            className={
                              todo.isCompleted
                                ? 'line-through text-zinc-400 dark:text-zinc-500'
                                : 'font-medium text-zinc-900 dark:text-zinc-100'
                            }
                          >
                            {todo.text}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTodo(slot.id, todo.id)}
                          className="text-zinc-400 hover:text-red-500 text-xs px-1.5 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline Add Task Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddTodo(slot.id, inputValue);
                  }}
                  className="mt-3 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(slot.id, e.target.value)}
                    placeholder={
                      isAshubh
                        ? isHi ? 'इस समय हेतु शांत कार्य जोड़ें...' : 'Add quiet chore for this slot...'
                        : isHi ? 'इस मुहूर्त में अपना कार्य जोड़ें...' : 'Add task for this auspicious window...'
                    }
                    className="flex-1 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                  {inputValue.trim().length > 0 && (
                    <button
                      type="submit"
                      className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600 cursor-pointer"
                    >
                      {isHi ? 'जोड़ें' : 'Add'}
                    </button>
                  )}
                </form>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
