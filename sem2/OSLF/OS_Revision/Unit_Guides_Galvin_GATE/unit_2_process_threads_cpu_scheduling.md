# Unit 2: Processes, Threads, and CPU Scheduling

Lectures covered: 7-15  
Syllabus weightage: 27%  
Galvin alignment: Processes, threads, and CPU scheduling.

## 1. Unit Target

By the end of this unit, you should be able to:

- Define process and explain process states.
- Explain PCB and context switching.
- Understand process creation, termination, and IPC.
- Differentiate process and thread.
- Explain user/kernel threads and multithreading models.
- Solve CPU scheduling numericals for FCFS, SJF, Priority, RR, and MLQ.
- Understand SRTF as the GATE-level preemptive extension of SJF.
- Understand MLFQ as an extra comparison topic; official handout lists MLQ, not MLFQ.
- Calculate CT, TAT, WT, RT, average TAT, and average WT.

## 2. Mental Model

A program is a file. A process is that program loaded and running.

The OS must answer:

```text
Which process exists?
Which process is ready?
Which process gets CPU next?
What happens when a process blocks or finishes?
How do processes communicate?
How can one process contain multiple threads?
```

CPU scheduling is the scoring topic of this unit. Most MCQs and GATE-style questions come from tracing a Gantt chart correctly.

## Official Lecture Breakdown

| Lectures | Official handout topic | Covered below |
|---:|---|---|
| 7-8 | Process definition, PCB, process states, state transition diagram, process creation, termination, context switching, IPC basics | sections 3-9 |
| 9-10 | Threads: overview, multicore programming, multithreading models, threading issues, Linux threads | sections 10-12 |
| 11-13 | CPU scheduling basics, scheduling criteria, FIFO/FCFS, SJF | sections 13-20 and 25-27 |
| 14-15 | Priority scheduling, Round Robin, Multilevel Queue Scheduling | sections 21-24 and 25-27 |

## 3. Program vs Process

| Program | Process |
|---|---|
| Passive entity | Active entity |
| Stored on disk | Loaded in memory |
| No execution state | Has execution state |
| Example: `.exe` file | Running instance of that program |

Important:

- One program can create many processes.
- Process execution must progress sequentially within each process.

## 4. Process Memory Layout

Typical process contains:

```text
Text section: program instructions
Data section: global/static variables
Heap: dynamically allocated memory
Stack: function calls, parameters, local variables, return addresses
```

MCQ trap:

- Heap grows dynamically during runtime.
- Stack stores function call information.
- Text section contains code.

## 5. Process States

Main states:

| State | Meaning |
|---|---|
| New | process is being created |
| Ready | process is waiting for CPU |
| Running | process is executing on CPU |
| Waiting/Blocked | process is waiting for I/O or event |
| Terminated | process has finished |

Common transitions:

```text
New -> Ready: admitted by OS
Ready -> Running: scheduler dispatch
Running -> Ready: interrupt/preemption
Running -> Waiting: I/O request or event wait
Waiting -> Ready: I/O/event completion
Running -> Terminated: process exits
```

GATE trick:

- If process is waiting for I/O, it is not in ready state.
- Ready means it has everything except CPU.
- Running means it currently owns CPU.

## 6. Process Control Block (PCB)

PCB is the OS data structure that stores process information.

It contains:

- Process state.
- Program counter.
- CPU registers.
- CPU scheduling information.
- Memory-management information.
- Accounting information.
- I/O status information.

Context switch:

```text
Save old process context in old PCB
Load new process context from new PCB
```

MCQ trap:

- Context switch is overhead.
- During context switch, CPU is not doing useful work for user processes.
- Bigger PCB/context means more switching overhead.

## 7. Process Scheduling Queues

| Queue | Contains |
|---|---|
| Job queue | all processes in the system |
| Ready queue | processes ready and waiting for CPU |
| Device queue | processes waiting for a device/I/O |

Schedulers:

| Scheduler | Role |
|---|---|
| Long-term scheduler | admits jobs into memory/ready queue |
| Short-term scheduler | selects next ready process for CPU |
| Medium-term scheduler | swaps processes out/in |

MCQ trap:

- Short-term scheduler runs very frequently.
- Long-term scheduler controls degree of multiprogramming.
- Medium-term scheduler is related to swapping.

## 8. Process Creation and Termination

### Creation

In Unix/Linux:

```text
fork() -> creates child process
exec() -> replaces process image with new program
wait() -> parent waits for child
exit() -> process terminates
```

Parent-child relation:

- Parent may continue concurrently with child.
- Parent may wait for child.
- Child may share some resources or get copies depending on OS.

### Termination

A process can terminate by:

- Normal completion.
- Error.
- Fatal exception.
- Being killed by another process.
- Parent terminating child.

Zombie process:

- Child has terminated, but parent has not collected its exit status using `wait()`.

Orphan process:

- Parent terminates before child; child is adopted by init/system process.

## 9. Interprocess Communication (IPC)

Processes may be independent or cooperating.

Cooperating processes need IPC for:

- Information sharing.
- Computation speedup.
- Modularity.
- Convenience.

### Shared Memory

Processes share a memory region.

Advantages:

- Fast after setup.
- Less kernel involvement during data exchange.

Disadvantages:

- Needs synchronization.
- Risk of race conditions.

### Message Passing

Processes communicate by send/receive operations.

Advantages:

- Easier for distributed systems.
- No shared address space needed.

Disadvantages:

- Kernel overhead.
- Usually slower than shared memory.

MCQ trick:

- "Fastest IPC after setup" usually means shared memory.
- "Good for distributed systems" usually means message passing.

## 10. Threads

### Thread Definition

A thread is the smallest unit of CPU execution within a process.

Thread has its own:

- Thread ID.
- Program counter.
- Register set.
- Stack.

Threads of same process share:

- Code section.
- Data section.
- Heap.
- Open files.
- Signals/resources.

Trick:

```text
Thread owns stack and registers.
Thread shares code, data, heap, and files.
```

### Benefits of Multithreading

| Benefit | Meaning |
|---|---|
| Responsiveness | one thread can continue while another waits |
| Resource sharing | threads share process memory/resources |
| Economy | cheaper than process creation/context switch |
| Scalability | parallelism on multicore systems |

### Multicore Programming

Multicore programming means designing software so different threads can run on different CPU cores at the same time.

Important ideas:

| Term | Meaning |
|---|---|
| Data parallelism | same operation is applied to different parts of data |
| Task parallelism | different threads perform different tasks |
| Load balancing | distribute work evenly across cores |
| Synchronization | coordinate shared data access |

MCQ traps:

- Multicore gives real parallelism only if the program has multiple runnable threads.
- More cores do not automatically mean linear speedup because synchronization, serial code, and memory contention limit performance.

### Process vs Thread

| Process | Thread |
|---|---|
| heavyweight | lightweight |
| separate address space | shares process address space |
| expensive context switch | cheaper context switch |
| IPC needed for communication | easy communication through shared memory |
| crash may not affect other process | thread bug may affect whole process |

### Concurrency vs Parallelism

| Term | Meaning |
|---|---|
| Concurrency | multiple tasks make progress over time |
| Parallelism | multiple tasks execute at same instant |

Single-core:

- Threads are concurrent, not truly parallel.

Multicore:

- Threads can execute truly in parallel.

## 11. Multithreading Models

| Model | Mapping | Advantage | Disadvantage |
|---|---|---|---|
| Many-to-one | many user threads -> one kernel thread | low overhead | no true parallelism; one blocking call blocks all |
| One-to-one | each user thread -> one kernel thread | true parallelism | more overhead |
| Many-to-many | many user threads -> many kernel threads | flexible | complex |

MCQ trap:

- Many-to-one cannot run threads in parallel on multiple CPUs.
- One-to-one supports parallelism but may create too many kernel threads.

## 12. Threading Issues

Important topics:

- `fork()` and `exec()` behavior in multithreaded process.
- Signal handling.
- Thread cancellation.
- Thread-local storage.
- Scheduler activations.

MCQ-level understanding:

- Thread cancellation means terminating a thread before completion.
- Asynchronous cancellation kills immediately; deferred cancellation lets thread check cancellation points.
- Thread-local storage gives each thread its own copy of data.

### Linux Threads

In Linux, threads are implemented using the same basic process abstraction used for processes.

Important points:

- Linux represents execution units using task structures.
- A thread can share address space, open files, and other resources with other threads in the same process.
- The `clone()` system call is the low-level mechanism that can create tasks sharing selected resources.
- POSIX threads, commonly called Pthreads, are the common user-level API used by C programs.

MCQ traps:

- Linux threads are scheduled by the kernel.
- Threads in the same process share address space but have separate stacks and register states.

## 13. CPU Scheduling Basics

CPU scheduling chooses which ready process gets CPU.

Scheduling is required because:

- Only one process can run on one CPU at a time.
- Processes alternate between CPU burst and I/O burst.
- Multiprogramming keeps CPU busy.

CPU-I/O burst cycle:

```text
CPU burst -> I/O burst -> CPU burst -> I/O burst -> ...
```

## 14. When Scheduling Happens

Scheduling decisions occur when:

1. Running process moves to waiting state.
2. Running process moves to ready state due to interrupt.
3. Waiting process moves to ready state after I/O completion.
4. Running process terminates.

Non-preemptive scheduling occurs only in cases 1 and 4.

Preemptive scheduling may occur in all cases.

## 15. Dispatcher

Dispatcher gives CPU control to the selected process.

It performs:

- Context switch.
- Switch to user mode.
- Jump to correct location in user program.

Dispatch latency:

- Time taken by dispatcher to stop one process and start another.

MCQ trap:

- Scheduler selects process.
- Dispatcher actually gives CPU to it.

## 16. Scheduling Criteria

| Criterion | Goal |
|---|---|
| CPU utilization | maximize |
| Throughput | maximize |
| Turnaround time | minimize |
| Waiting time | minimize |
| Response time | minimize |

Formulas:

```text
Completion Time (CT) = time when process finishes
Turnaround Time (TAT) = CT - Arrival Time
Waiting Time (WT) = TAT - Burst Time
Response Time (RT) = First CPU Start Time - Arrival Time
```

If all processes arrive at time 0:

```text
TAT = CT
WT = CT - BT
RT = first start time
```

GATE trap:

- Response time is not completion time.
- Waiting time excludes actual CPU execution time.

## 17. Gantt Chart Method

For any scheduling problem:

1. Write process table: AT, BT, priority if given.
2. Draw time line.
3. At every decision point, list available ready processes.
4. Apply algorithm rule.
5. Record first start time and completion time.
6. Calculate TAT, WT, RT.

Decision points are:

- Time 0.
- Arrival of new process.
- Completion of current process.
- Quantum expiry.
- Preemption point.

## 18. FCFS Scheduling

First Come First Serve.

Rule:

- Process with earliest arrival time runs first.
- Non-preemptive.

Advantages:

- Simple.
- No starvation.
- Fair by arrival order.

Disadvantages:

- Convoy effect.
- Poor average waiting time if long process arrives first.

Convoy effect:

- Short processes wait behind a long CPU-bound process.

Example:

| Process | AT | BT |
|---|---:|---:|
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 1 |

FCFS Gantt:

```text
0   5   8   9
|P1|P2|P3|
```

Calculations:

| Process | CT | TAT = CT-AT | WT = TAT-BT |
|---|---:|---:|---:|
| P1 | 5 | 5 | 0 |
| P2 | 8 | 7 | 4 |
| P3 | 9 | 7 | 6 |

## 19. SJF Scheduling

Shortest Job First.

Rule:

- Select process with smallest CPU burst among ready processes.
- Usually non-preemptive unless stated.

Advantages:

- Minimum average waiting time if burst times are known.

Disadvantages:

- Burst time is hard to know exactly.
- Long processes may starve.

MCQ trap:

- SJF is optimal for average waiting time in non-preemptive setting if all jobs are available/known.

## 20. SRTF Scheduling

Shortest Remaining Time First.

Official status:

- Not named separately in the handout.
- Included here because it is the preemptive form of SJF and common in GATE-style scheduling questions.

Rule:

- Preemptive version of SJF.
- If a new process arrives with smaller remaining time, current process is preempted.

GATE solving trick:

- Check only at arrival times and completion times.
- Track remaining burst time carefully.

Example:

| Process | AT | BT |
|---|---:|---:|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 2 |

Trace:

```text
0-1: P1 runs, remaining P1=7
1-2: P2 runs, remaining P2=3
2-4: P3 runs and completes
4-7: P2 completes
7-14: P1 completes
```

Gantt:

```text
0 1 2 4 7 14
|P1|P2|P3|P2|P1|
```

## 21. Priority Scheduling

Rule:

- CPU goes to highest-priority process.

Important:

- Some questions use smaller number as higher priority.
- Some questions use larger number as higher priority.
- Always read the statement.

Types:

- Preemptive priority.
- Non-preemptive priority.

Problem:

- Starvation of low-priority processes.

Solution:

- Aging: increase priority of waiting processes over time.

MCQ trap:

- SJF can be considered priority scheduling where priority is predicted CPU burst.

## 22. Round Robin Scheduling

Rule:

- Each process gets time quantum `q`.
- If process does not finish within `q`, it is preempted and sent to end of ready queue.

Properties:

- Preemptive.
- Good for time-sharing systems.
- No starvation.

Quantum effects:

| Quantum | Effect |
|---|---|
| Very large | behaves like FCFS |
| Very small | too much context-switch overhead |
| Suitable | good response time |

Formula:

```text
If n processes are in ready queue and quantum is q,
maximum wait before next turn is approximately (n - 1)q.
```

GATE RR queue trick:

- When a quantum expires at the same time a new process arrives, use the convention usually implied by the problem. If not specified, most textbook-style solutions enqueue the newly arrived process before re-adding the preempted process only if arrival is processed first. In exams, options usually avoid ambiguity.

## 23. Multilevel Queue Scheduling

Ready queue is divided into multiple queues.

Example:

```text
System processes
Interactive processes
Batch processes
Student/background processes
```

Features:

- Process is permanently assigned to one queue.
- Each queue may use different scheduling algorithm.
- Scheduling between queues may be fixed priority or time slicing.

MCQ trap:

- In MLQ, processes do not move between queues.

## 24. Multilevel Feedback Queue Scheduling

Official status:

- Not named separately in the official handout.
- Included as a useful comparison against Multilevel Queue Scheduling and for GATE-style MCQs.

MLFQ allows processes to move between queues.

Idea:

- If process uses too much CPU, move it to lower-priority queue.
- If process waits too long, move it up to prevent starvation.

Features:

- Adaptive.
- Good for separating CPU-bound and I/O-bound jobs.
- Most general but complex.

MCQ trap:

- MLQ = fixed queue assignment.
- MLFQ = movement between queues.

## 25. Common Scheduling Comparison

| Algorithm | Preemptive? | Starvation? | Best known for |
|---|---|---|---|
| FCFS | No | No | simplicity |
| SJF | No | Yes | minimum average waiting time |
| SRTF | Yes | Yes | preemptive shortest remaining time |
| Priority | both possible | Yes | importance-based scheduling |
| Round Robin | Yes | No | time sharing |
| MLQ | usually depends | possible | separate fixed queues |
| MLFQ | Yes | reduced by aging | adaptive scheduling |

## 26. GATE-Level Problem Types

### Type 1: Direct Formula

Given AT, BT, CT. Find TAT/WT.

Use:

```text
TAT = CT - AT
WT = TAT - BT
```

### Type 2: Draw Gantt Chart

Given AT and BT. Apply scheduling algorithm.

Tip:

- Do not calculate from intuition. Draw the chart.

### Type 3: Preemption

Algorithms:

- SRTF.
- Preemptive priority.
- Round Robin.

Tip:

- Recheck at every arrival.

### Type 4: Average Time

After table:

```text
Average TAT = sum(TAT) / n
Average WT = sum(WT) / n
```

### Type 5: Identify Algorithm Behavior

Examples:

- Large quantum RR -> FCFS.
- SJF gives minimum average waiting time.
- Priority scheduling starvation -> aging.
- FCFS convoy effect.

## 27. Common Mistakes

1. Confusing arrival time with start time.
2. Using `WT = CT - BT` when arrival times are not all zero.
3. Forgetting preemption in SRTF.
4. Treating SJF as preemptive when question says non-preemptive.
5. Ignoring CPU idle time when no process has arrived.
6. In RR, forgetting to put unfinished process back in ready queue.
7. Reading priority direction wrongly.
8. Confusing response time with turnaround time.

## 28. Quick Revision Box

- Process = program in execution.
- PCB stores process context.
- Context switch is overhead.
- Ready = waiting for CPU.
- Waiting = waiting for I/O/event.
- Shared memory IPC is faster but needs synchronization.
- Thread has own stack/registers, shares code/data/heap/files.
- Many-to-one threads cannot run in true parallel.
- FCFS is non-preemptive and may cause convoy effect.
- SJF minimizes average waiting time but may starve long jobs.
- SRTF is preemptive SJF.
- Priority scheduling starvation is solved by aging.
- RR is preemptive; very large quantum becomes FCFS.
- MLQ has fixed queues; MLFQ allows movement.

## 29. Practice Prompts

1. Differentiate program, process, and thread.
2. Draw the five-state process diagram and explain each transition.
3. Explain what is saved in PCB during context switch.
4. Compare shared memory and message passing IPC.
5. Solve FCFS, SJF, SRTF, Priority, and RR for the same process table.
6. Explain why Round Robin is suitable for time-sharing systems.
7. Explain starvation and aging in priority scheduling.
