# OSLF Unit Map and Study Method

Basis: `cho.pdf` lecture-wise syllabus. Style: Galvin/Silberschatz concepts plus GATE-level problem solving and MCQ traps.

## Unit Segregation

| Unit | Lectures | Syllabus topics | Weightage from handout | Galvin/Silberschatz alignment |
|---|---:|---|---:|---|
| Unit 1 | 1-6 | OS introduction, computer system architecture, OS operations, OS components, OS structures, system calls, Linux basics | 18% | Ch. 1 Introduction, Ch. 2 OS Structures |
| Unit 2 | 7-15 | Process management, IPC, threads, CPU scheduling: FCFS, SJF, priority, RR, MLQ | 27% | Ch. 3 Processes, Ch. 4 Threads, Ch. 5 CPU Scheduling |
| Unit 3 | 16-21 | Process synchronization, critical-section problem, hardware support, semaphores, deadlocks, prevention, avoidance, detection, recovery | 20% | Ch. 6 Synchronization, Ch. 7 Deadlocks |
| Unit 4 | 22-29 | Memory management, address binding, MMU, swapping, contiguous allocation, fragmentation, paging, segmentation, virtual memory, demand paging, page replacement, frame allocation, thrashing | 26% | Ch. 8 Memory Management, Ch. 9 Virtual Memory |
| Unit 5 | 30-32 | Mass storage structure, disk scheduling, disk management, file management, file allocation, free-space management, important Linux lab commands | 9% | Ch. 10 Mass Storage, Ch. 11-12 File Systems |

Notes:

- SRTF is included in Unit 2 as a GATE-level extension of SJF because it is the preemptive form of shortest-job scheduling.
- MLFQ is included in Unit 2 as a comparison/trick topic, but the official handout line explicitly lists Multilevel Queue Scheduling, not Multilevel Feedback Queue Scheduling.
- The official handout splits assessment coverage as ST1: lectures 1-15, ST2: lectures 16-29, and End Term: lectures 1-32.

## Exact Lecture-Wise Coverage Audit

Use this table as the main checklist. If it is in `cho.pdf`, it is mapped here.

| Lectures | Official topic from handout | Weightage | Study in guide |
|---:|---|---:|---|
| 1-2 | Introduction to Operating Systems, OS role, computer system architecture: single processor, multiprocessor systems, clustered systems, OS operations, OS components: process, memory, storage, I/O management | 6% | `unit_1_os_linux_foundations.md` sections 3-8 |
| 3-4 | OS Structure: monolithic, layered, microkernel, kernel, shell, OS services and system calls, user and OS interface, System Calls/API, types of system calls, system programs | 6% | `unit_1_os_linux_foundations.md` sections 9-11 and 14-15 |
| 5-6 | Linux OS: history, philosophy, distributions, Linux architecture overview | 6% | `unit_1_os_linux_foundations.md` sections 12-13 |
| 7-8 | Process Management: process definition, PCB, process states, state transition diagram, process creation, termination, context switching, IPC basics | 6% | `unit_2_process_threads_cpu_scheduling.md` sections 3-9 |
| 9-10 | Threads: overview, multicore programming, multithreading models, threading issues, Linux threads | 6% | `unit_2_process_threads_cpu_scheduling.md` sections 10-12 |
| 11-13 | CPU Scheduling: basic concepts, scheduling criteria, FIFO/FCFS, SJF | 9% | `unit_2_process_threads_cpu_scheduling.md` sections 13-20 and 25-27 |
| 14-15 | Priority scheduling, Round Robin, Multilevel Queue Scheduling | 6% | `unit_2_process_threads_cpu_scheduling.md` sections 21-23 and 25-27; section 24 is optional MLFQ comparison |
| 16-18 | Process Synchronization: background, critical-section problem, two-process solution, multiple-process solution, synchronization hardware, semaphores | 10% | `unit_3_synchronization_deadlocks.md` sections 3-13 |
| 19-21 | Deadlock: system model, deadlock characterization, methods for handling deadlocks, prevention, avoidance, detection, recovery | 10% | `unit_3_synchronization_deadlocks.md` sections 14-27 |
| 22-25 | Memory Management and Virtualisation: logical vs physical address space, MMU, swapping, contiguous memory allocation, fragmentation, segmentation, paging, segmentation with paging | 13% | `unit_4_memory_virtual_memory.md` sections 3-16 and 33-35 |
| 26-29 | Virtual Memory: introduction, demand paging, page replacement algorithms, allocation of frames, thrashing | 13% | `unit_4_memory_virtual_memory.md` sections 17-32 and 34-36 |
| 30-31 | Mass Storage Structure: overview, disk structure, disk attachment, disk scheduling, disk management | 6% | `unit_5_storage_file_management.md` sections 3-14 and 26-28 |
| 32 | File Management System: file allocation methods, free-space management | 3% | `unit_5_storage_file_management.md` sections 20-22 and 26-28; sections 15-19 and 23-25 support file-system/lab understanding |

## Assessment-Wise Study Split

| Assessment zone | Lectures | Units to study | Official coverage |
|---|---:|---|---:|
| ST1 | 1-15 | Units 1-2 | 45% |
| ST2 new portion | 16-29 | Units 3-4 | about 46% |
| End Term full course | 1-32 | Units 1-5 | 100% |

## What to Read First

If the exam is close, follow this order:

1. Unit 4: memory and virtual memory.
2. Unit 2: CPU scheduling and processes.
3. Unit 3: synchronization and deadlocks.
4. Unit 1: OS/Linux basics.
5. Unit 5: storage and file systems.

Reason:

- Unit 4 has high weightage and many calculation/trap-based MCQs.
- Unit 2 has scheduling numericals, which are easy marks after practice.
- Unit 3 has definition-heavy MCQs plus Banker/safe-sequence problems.
- Unit 1 and Unit 5 are more direct factual topics.

## How to Use Each Unit Guide

Each unit guide has:

- Lecture mapping.
- Core understanding.
- Galvin-style definitions and concepts.
- GATE-level problem types.
- Formulas.
- Tricks and traps.
- Quick revision box.
- Practice prompts.

Use this flow:

1. Read the "Mental Model" first.
2. Study definitions and tables.
3. Do the GATE-level examples/tricks.
4. End with the quick revision checklist.

## Existing Material Linked to These Units

| Existing file | Best used with |
|---|---|
| `OSLF_MCQ_Revision_Guide.md` | Final one-shot MCQ revision |
| `unit1_process_sync_deadlocks.md` | Unit 3 |
| `unit2_memory_management_virtualization.md` | Unit 4 |
| `disk_scheduling_algorithms.md` | Unit 5 |
| `questions.md` | Units 3 and 4 MCQ practice |

## Golden Rule for OSLF MCQs

Most MCQs test one of four things:

1. Exact definition: kernel, process, thread, semaphore, deadlock, paging.
2. Difference: program vs process, paging vs segmentation, safe vs unsafe, preemptive vs non-preemptive.
3. Formula: TAT/WT/RT, EAT, physical address, Need matrix, disk head movement.
4. Algorithm trace: CPU scheduling, Banker's algorithm, page replacement, disk scheduling.

Whenever you see an MCQ, first identify which of these four categories it belongs to.
